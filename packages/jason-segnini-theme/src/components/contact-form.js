import { useState, useRef, useEffect } from "react"
import { connect, styled, css, fetch } from "frontity"
import { input, submit, inputWithWrapper } from "../styles/common"
import AnimatedWrapper from "./common/animated-wrapper"
import AnimatedText from "./common/animated-text"
import Loading from "./common/loading"
import Lobo from "./common/lobo"

const ContactForm = ({state, actions}) => {
    const [states, setStates] = useState({})
    const color =  !states.isError ? state.theme.color : '#d75a5a'
    const autofillColor = !states.isError ? '#628a6c' : '#8a6262'
    const values = useRef({})
    const isMobile = state.screen.isMobile

    useEffect(() => {
        if (states.isSubmitting) {
            let controller = new AbortController();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values.current),
                signal: controller.signal
            }
    
            const postMessage = async () => {
                const response = await fetch(
                    `${state.source.url}wp-json/jasonsegnini/v1/mail`, 
                    requestOptions
                )
    
                if (response.ok)
                    setStates(states => ({
                        ...states,
                        isSubmitting: false,
                        isSubmitted: true
                    }))
                else {
                    actions.theme.setContactError(true)
                    setStates(states => ({
                        ...states,
                        isSubmitting: false,
                        isError: true
                    }))
                }
            }

            postMessage()
            return () => controller?.abort()
        }
    }, [states.isSubmitting])

    useEffect(() => () => actions.theme.setContactError(false), [])

    return (
        <Form 
            color={color}
            onSubmit={e => {
                e.preventDefault()
                actions.theme.setContactError(false)
                setStates(states => ({
                    ...states,
                    isSubmitting: true,
                    isSubmitted: false,
                    isError: false
                }))
            }}
        >  
            {states.isSubmitting && <Loading text='Submitting...'/>}
            {states.isError 
                    && 
                    <div css={css`text-align: center;`}> 
                        {<><Lobo forceError/><br/></>}
                        <AnimatedText 
                            text='Woops! There was an error when sending the message.'    
                        />
                    </div>
                }
            {states.isSubmitted 
                && 
                <div css={css`text-align: center;`}>
                    <AnimatedText 
                        text='Message sent successfully.'    
                    />
                    <br/>
                    <br/>
                </div>
            }  
            <label>
                <AnimatedText 
                    text='Your name:'    
                />
            </label>
            <AnimatedWrapper color={color} css={wrapperInputStyles(isMobile)}>
                <Input 
                    name='name'
                    maxlength='50'
                    color={color}
                    autofillColor={autofillColor}
                    isMobile={isMobile}
                    onChange={e => values.current.name = e.target.value}
                    required
                />
            </AnimatedWrapper>    
            <label>
                <AnimatedText 
                    text='Your email:'    
                />
            </label>
            <AnimatedWrapper color={color} css={wrapperInputStyles(isMobile)}>
                <Input 
                    name='email'
                    type='email'
                    maxlength='50'
                    color={color}
                    autofillColor={autofillColor}
                    isMobile={isMobile}
                    onChange={e => values.current.email = e.target.value}
                    required
                />
            </AnimatedWrapper>
            <label>
                <AnimatedText 
                    text='Subject:'    
                />
            </label>
            <AnimatedWrapper color={color} css={wrapperInputStyles(isMobile)}>
                <Input 
                    name='subject'
                    maxlength='50'
                    color={color}
                    autofillColor={autofillColor}
                    isMobile={isMobile}
                    onChange={e => values.current.subject = e.target.value}
                    required
                />
            </AnimatedWrapper>
            <label>
                <AnimatedText 
                    text='Message:'    
                />
            </label>
            <AnimatedWrapper 
                color={color} 
                css={css`
                    ::before, ::after {transition: border-width 0s .25s;}
                `}>
                <Textarea
                    name='content'
                    color={color}
                    onChange={e => values.current.content = e.target.value}
                    required
                />
            </AnimatedWrapper>
            <AnimatedWrapper shadows color={color} css={css`
                ${wrapperInputStyles()}
                margin: auto;
            `}> 
                <Button color={color} > Send </Button> 
            </AnimatedWrapper>
        </Form>
    )
}

export default connect(ContactForm)

const wrapperInputStyles = isMobile => css`
    width: ${isMobile ? '100%' : 'fit-content'};
    height: fit-content;
    ::before, ::after {transition: border-width 0s .25s;}
`

const Button = styled.button`
    font-size: large;
    ${inputWithWrapper}
    ${props => input(props.color)}
    ${props => submit(props.color)}
    padding: 10px;
`

const Input = styled.input`
    font-size: medium;
    width: ${props => props.isMobile ? '100%' : '20vw'};
    ${inputWithWrapper}
    ${props => input(props.color, props.autofillColor)}
    padding-left: 2px;
    margin-bottom: 10px;
    :-webkit-autofill::first-line {font-size: medium;}
`

const Textarea = styled.textarea`
    font-size: medium;
    width: 100%;
    height: 30vh;
    resize: none;
    ${inputWithWrapper}
    ${props => input(props.color)}
    padding-top: 3px;
    padding-left: 2px;
    margin-bottom: 1em;
`

const Form = styled.form`
    position: relative;
    color: ${props => props.color};
    padding: 1em 1em 5px;
    z-index: 1;
`