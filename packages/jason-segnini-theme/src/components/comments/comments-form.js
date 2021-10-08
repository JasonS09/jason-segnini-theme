import { connect, styled, css } from "frontity"
import { input, inputWithWrapper, submit } from "../../styles/common"
import { useState, useRef, useEffect } from "react"
import Loading from "../common/loading"
import AnimatedWrapper from "../common/animated-wrapper"
import Lobo from "../common/lobo"

const CommentsForm = ({state, actions, postId, visible}) => {
    const replyComment = state.comments.replyComment
    const form = state.comments.forms[postId]
    const color = !form?.errorMessage ? state.theme.color : '#d75a5a'
    const autofillColor = !form?.errorMessage ? '#628a6c' : '#8a6262'
    const [scale, setScale] = useState(false)
    const ref = useRef(null)

    useEffect(() => 
        actions.comments.getCommentsFormHeight(ref.current.clientHeight), 
        [
            form?.errorMessage, 
            form?.isSubmitting, 
            form?.isSubmitted, 
            replyComment
        ]
    )

    return (
        <AnimatedWrapper 
            shadows
            color={color}
            css={wrapperStyles(color, scale, visible)}
        >
            <Form 
                onSubmit={e => {
                    e.preventDefault()
                    if (replyComment) {
                        actions.comments.updateFields(
                            postId,
                            {parent: replyComment}
                        )
                        actions.comments.setReplyComment()
                    }
                    actions.comments.submit(postId)
                }}
                ref={ref}
            >
                {replyComment !== 0
                    && 
                    <Div>
                        <span>Reply comment from {
                            state.source.comment[replyComment].author_name
                        }
                        </span> 
                        <span 
                            onClick={() => actions.comments.setReplyComment()}
                            css={css`
                                color: ${color};
                                cursor: pointer;
                            `}
                        > X </span>
                        <br/>
                    </Div>
                }
                {form?.isSubmitting && <Loading text='Submitting...'/>}
                {form?.errorMessage 
                    && 
                    <Div> 
                        <Lobo forceError/> <br/>
                        ERROR! {form?.errorMessage}
                    </Div>
                }
                {form?.isSubmitted 
                    && 
                    <div css={css`text-align: center;`}>
                        Comment submitted succesfully! Please wait until it's approved.
                        <br/>
                    </div>
                }
                <label>
                    Name:
                    <AnimatedWrapper color={color} css={wrapperInputStyles}>
                        <Input
                            name='author_name'
                            color={color}
                            autofillColor={autofillColor}
                            value={form?.fields?.authorName || ''}
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
                    {form?.errors?.authorName}
                </label>
                <br/>
                <br/>
                <label>
                    Email:
                    <AnimatedWrapper color={color} css={wrapperInputStyles}>
                        <Input
                            name='author_email'
                            color={color}
                            autofillColor={autofillColor}
                            value={form?.fields?.authorEmail || ''}
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
                    {form?.errors?.authorEmail}
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
                            value={form?.fields?.content || ''}
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
                    {form?.errors?.content}
                </label>
                <AnimatedWrapper shadows color={color} css={css`
                    ${wrapperInputStyles}
                    margin: auto;
                `}> 
                    <Button 
                        color={color} 
                        onFocus={() => setScale(true)}
                        onBlur={() => setScale(false)}
                    > 
                        Post
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

    ::before, ::after {
        z-index: 0;
        transition: border-width 0s .25s;
    }
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