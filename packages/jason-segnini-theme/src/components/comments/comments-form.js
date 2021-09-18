import {connect, styled, css} from "frontity"
import {input, inputWithWrapper} from "../../styles/common"
import Loading from "../common/loading"
import AnimatedWrapper from "../common/animated-wrapper"
import AnimatedText from "../common/animated-text"

const CommentsForm = ({state, actions, postId}) => {
    const form = state.comments.forms[postId]
    const color = !form?.errorMessage ? state.theme.color : '#d75a5a'
    const autofillColor = !form?.errorMessage ? '#628a6c' : '#8a6262'

    return (
        <AnimatedWrapper 
            shadows
            color={color}
            css={wrapperStyles(color)}
        >
            <Form onSubmit={e => {
                e.preventDefault
                actions.comments.submit(postId)
            }}>
                {form?.isSubmitting && <Loading text='Submitting...'/>}
                <label>
                    <AnimatedText text='Name:'/>
                    <AnimatedWrapper color={color} css={wrapperInputStyles}>
                        <Input
                            name='author_name'
                            color={color}
                            autofillColor={autofillColor}
                            value={state.comments.forms[postId]?.fields?.authorName || ''}
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
                {form?.errorMessage && <div>ERROR! {form?.errorMessage}</div>}
                <div>
                    {form?.isSubmitted && 'The comment was submitted succesfully!'}
                </div>
                <input type='submit'/>
            </Form>
        </AnimatedWrapper>
    )
}

export default connect(CommentsForm)

const wrapperStyles = color => css`
    color: ${color};
    background-color: rgba(0,0,0,.85);
    padding: 1em;
    margin-bottom: 10px;
    transition: transform .25s ease-out;

    :hover {
        transform: scale(1.01, 1.01);

        form label div::before,
        form label div::after,
        ::before, 
        ::after {
            border-width: 2px;
            transition: none;
        }
    }

    ::before, ::after {transition: border-width 0s .25s;}
`

const wrapperInputStyles = css`
    width: fit-content;
    height: fit-content;
    ::before, ::after {transition: border-width 0s .25s;}
`

const Input = styled.input`
    ${inputWithWrapper}
    ${props => input(props.color, props.autofillColor)}
`

const Textarea = styled.textarea`
    width: 100%;
    height: 10em;
    resize: none;
    ${inputWithWrapper}
    ${props => input(props.color)}
    padding-top: 10px;
`

const Form = styled.form`
    position: relative;
    color: ${props => props.color};
    z-index: 1;
`