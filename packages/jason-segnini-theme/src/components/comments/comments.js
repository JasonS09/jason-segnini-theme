import { connect, styled, css } from "frontity"
import { useState, useEffect } from "react"
import { center } from "../../styles/common"
import Hide from "../common/hide"
import CommentsList from "./comments-list"
import CommentsForm from "./comments-form"

const Comments = ({state, postId}) => {
    const formHeight = state.comments.commentsHeight.form + 20
    const listHeight = state.comments.commentsHeight.list + 20
    const replyComment = state.comments.replyComment
    const form = state.comments.forms[postId]
    const commentContent = form?.fields?.content
    const items = state.source.get(`@comments/${postId}`).items
    const [states, setStates] = useState({ 
        isComponentHidden: true,
        isFirstTime: true,
        isCommentsForm: items?.length ? false : true
    })

    useEffect(() => {        
        if (replyComment || commentContent)
            setStates(states => ({
                ...states,
                isCommentsForm: true
            }))
    }, [replyComment, commentContent])

    useEffect(() => {
        if (items?.length && !form?.isSubmitting) {
            setStates(states => ({
                ...states,
                isCommentsForm: false
            }))
        }
    }, [items?.length])

    return (
        <Container 
            isComponentHidden={states.isComponentHidden}
            transition={!states.isFirstTime 
                && (!form?.isSubmitting || states.isComponentHidden)}
            contentHeight={Math.max(formHeight, listHeight)}
            contentOffset={states.isCommentsForm ? formHeight : listHeight}
        >
            <ButtonsTab>
                <Hide 
                    type='archive' 
                    onClick={() => {
                        setStates(states => ({
                            ...states,
                            isComponentHidden: !states.isComponentHidden,
                            isFirstTime: false
                        })
                    )}}
                    css={hideStyles(states.isComponentHidden)}
                />
                {items?.length !== 0
                    && 
                    <Hide 
                        type='archive'
                        text='C'
                        onClick={() => 
                            {setStates(states => ({
                                ...states,
                                isCommentsForm: false
                            }))}
                        }
                        css={css`
                            ${tabButtonStyles(!states.isCommentsForm, true)}
                            transform: none;
                        `}
                    />
                }
                <Hide 
                    type='archive'
                    text='+'
                    onClick={()=> {
                        setStates(states => ({
                            ...states,
                            isCommentsForm: true
                        }))}
                    }
                    css={css`
                        ${tabButtonStyles(states.isCommentsForm)}
                        transform: none;
                    `}
                />
            </ButtonsTab>
            <Content 
                isCommentsForm={states.isCommentsForm}  
                height={formHeight >= listHeight ? 'auto;' : `${listHeight}px;`}
            >
                <CommentsForm postId={postId} visible={states.isCommentsForm}/>
                <CommentsList 
                    postId={postId} 
                    visible={!states.isCommentsForm} 
                    isComponentHidden={states.isComponentHidden}    
                />
            </Content>
        </Container>
    )
}

export default connect(Comments)

const hideStyles = isComponentHidden => css`
    position: relative;
    display: inline-block;
    height: 47px;
    top: auto;
    right: auto;
    left: auto;
    margin-right: 10px;
    transform: ${isComponentHidden
        ? 'rotate(-90deg);'
        : 'rotate(90deg);'
    }
`

const tabButtonStyles = (isActive, isCommentsList) => css`
    ${hideStyles()}
    & > div {
        ::before {
            ${center}
            ${isCommentsList 
                && css`
                    transform: 
                        translate(-50%, -50%) rotate(90deg);
                `
            }
            ${isActive && 'width: 100%;'}
        }

        h1 {
            padding: 0;
            ${isActive && 'color: black;'}
        }
    }
`

const Content = styled.div`
    position: relative;
    height: ${props => props.height};
    padding: 10px;
`

const ButtonsTab = styled.div`
    width: 100%;
    padding-left: 1em;
    padding-top: 10px;
`

const Container = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    ${props => props.transition 
        && css`transition: margin 1s ease-out;`
    }
    margin-bottom: ${props => 
        props.isComponentHidden
            ? `-${props.contentHeight}px;`
            : `-${props.contentHeight-props.contentOffset}px;`
    };
`