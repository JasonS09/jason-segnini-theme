import {connect, styled, css} from "frontity"
import {input, inputWithWrapper, submit} from "../../styles/common"
import {useState, useRef, useEffect} from "react"
import Loading from "../common/loading"
import AnimatedWrapper from "../common/animated-wrapper"
import AnimatedText from "../common/animated-text"
import Lobo from "../common/lobo"

const CommentsForm = ({state, actions, postId, visible}) => {
    const form = state.comments.forms[postId]
    const color = !form?.errorMessage ? state.theme.color : '#d75a5a'
    const autofillColor = !form?.errorMessage ? '#628a6c' : '#8a6262'
    const [scale, setScale] = useState(false)
    const ref = useRef(null)

    useEffect(() => 
        actions.theme.getCommentsFormHeight(ref.current.clientHeight), 
    [form])

    return (
        <AnimatedWrapper 
            shadows
            color={color}
            css={wrapperStyles(color, scale, visible)}
        >
            <Form 
                onSubmit={e => {
                    e.preventDefault()
                    actions.comments.submit(postId)
                }}
                ref={ref}
            >
                {form?.isSubmitting && <Loading text='Submitting...'/>}
                {form?.errorMessage 
                    && 
                    <Div> 
                        <Lobo forceError/> <br/>
                        ERROR! {form?.errorMessage}
                    </Div>
                }
                <label>
                    <AnimatedText text='Name:'/>
                    <AnimatedWrapper color={color} css={wrapperInputStyles}>
                        <Input
                            name='author_name'
                            color={color}
                            autofillColor={autofillColor}
                            value={state.comments.forms[postId]?.fields?.authorName || ''}
                            onFocus={() => setScale(true)}
                            onBlur={() => setScale(false)}
                            onChange={e => 
                                actions.comments.updateFields(
                                    postId,
                                    {authorName: e.target.value}
                                )
                            }
                        />
                    </AnimatedWrapper>
                    <AnimatedText text={form?.errors?.authorName}/>
                </label>
                <br/>
                <br/>
                <label>
                    <AnimatedText text='Email:'/>
                    <AnimatedWrapper color={color} css={wrapperInputStyles}>
                        <Input
                            name='author_email'
                            color={color}
                            autofillColor={autofillColor}
                            value={state.comments.forms[postId]?.fields?.authorEmail || ''}
                            onFocus={() => setScale(true)}
                            onBlur={() => setScale(false)}
                            onChange={e => 
                                actions.comments.updateFields(
                                    postId,
                                    {authorEmail: e.target.value}
                                )
                            }
                        />
                    </AnimatedWrapper>
                    <AnimatedText text={form?.errors?.authorEmail}/>
                </label>
                <br/>
                <br/>
                <label>
                    <AnimatedWrapper 
                        color={color} 
                        css={css`
                            ::before, ::after {transition: border-width 0s .25s;}
                        `}
                    >
                        <Textarea
                            name='content'
                            color={color}
                            value={state.comments.forms[postId]?.fields?.content || ''}
                            onFocus={() => setScale(true)}
                            onBlur={() => setScale(false)}
                            onChange={e => 
                                actions.comments.updateFields(
                                    postId,
                                    {content: e.target.value}
                                )
                            }
                        />
                    </AnimatedWrapper>
                    <AnimatedText text={form?.errors?.content}/>
                </label>
                <div>
                    {form?.isSubmitted && 'The comment was submitted succesfully!'}
                </div>
                <AnimatedWrapper shadows color={color} css={css`
                    ${wrapperInputStyles}
                    margin: auto;
                `}> 
                    <Button 
                        color={color} 
                        onFocus={() => setScale(true)}
                        onBlur={() => setScale(false)}
                    > 
                        <AnimatedText text='Post'/> 
                    </Button> 
                </AnimatedWrapper>
            </Form>
        </AnimatedWrapper>
    )
}

export default connect(CommentsForm)

const scaleWrapper = css`
    transform: scale(1.01, 1.01);

    form label div::before,
    form label div::after,
    form div::before,
    form div::after,
    ::before, 
    ::after {
        border-width: 2px;
        transition: none;
    }
`

const wrapperStyles = (color, scale, visible) => css`
    visibility: ${visible ? 'visible;' : 'hidden;'};
    color: ${color};
    background-color: rgba(0,0,0,.85);
    ${scale && scaleWrapper}
    transition: transform .25s ease-out;

    :hover {
        ${scaleWrapper}
    }

    ::before, ::after {transition: border-width 0s .25s;}
`

const wrapperInputStyles = css`
    width: fit-content;
    height: fit-content;
    ::before, ::after {transition: border-width 0s .25s;}
`

const Div = styled.div`text-align: center;`

const Button = styled.button`
    font-size: large;
    ${inputWithWrapper}
    ${props => input(props.color)}
    ${props => submit(props.color)}
    padding: 10px;
`

const Input = styled.input`
    font-size: medium;
    ${inputWithWrapper}
    ${props => input(props.color, props.autofillColor)}
    padding-left: 2px;
    :-webkit-autofill::first-line {font-size: medium;}
`

const Textarea = styled.textarea`
    font-size: medium;
    width: 100%;
    height: 10em;
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
    padding: 1em;
    z-index: 1;
`