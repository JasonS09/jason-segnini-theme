import { connect, styled, css } from "frontity"
import { useState, useEffect, useRef } from "react"
import { center } from "../../styles/common"
import Hide from "../common/hide"
import CommentsList from "./comments-list"
import CommentsForm from "./comments-form"
import SvgComments from "./icons/svg-comments"
import SvgAddComment from "./icons/svg-add-comment"

const Comments = ({state, actions, postId}) => {
    const formHeight = state.comments.commentsHeight.form + 20
    const listHeight = state.comments.commentsHeight.list + 20
    const replyComment = state.comments.replyComment
    const form = state.comments.forms[postId]
    const commentContent = form?.fields?.content
    const refs = useRef({initScreenHeight: state.screen.screenSize[1]})

    const checkAtLeastOneCommentApproved = () => {
        const items = state.source.get(`@comments/${postId}`).items
        return items?.length 
            && items.find(({id}) => 
                state.source.comment[id].content.plain
            )
            ? true
            : false
    }

    const areThereComments = checkAtLeastOneCommentApproved()
    const [states, setStates] = useState({ 
        isComponentHidden: true,
        isFirstTime: true,
        isCommentsForm: areThereComments ? false : true
    })

    const getHeightToHide = () => {
        const totalContentHeight = Math.max(formHeight, listHeight)
        return states.isComponentHidden 
            ? totalContentHeight
            : states.isCommentsForm 
                ? totalContentHeight - formHeight 
                : totalContentHeight - listHeight
    }

    const heightTohide = getHeightToHide()

    useEffect(() => {
        const per_page = state.source.params.per_page
        Object.assign(state.source.params, {per_page: 100})
        actions.source.fetch(`@comments/${postId}`)
        actions.source.fetch(`/jasonsegnini/v1/comments?post_id=${postId}`)
        Object.assign(state.source.params, {per_page: per_page})
    }, [form?.isSubmitted])

    useEffect(() => {        
        if (replyComment)
            setStates(states => ({
                ...states,
                isCommentsForm: true
            }))

        if (commentContent)
            setStates(states => ({
                ...states,
                isCommentsForm: true,
                isComponentHidden: false
            }))
    }, [replyComment, commentContent])

    useEffect(() => {
        if (areThereComments 
            && !form?.isSubmitting 
            && !commentContent) {
            setStates(states => ({
                ...states,
                isCommentsForm: false
            }))
        }
    }, [areThereComments])

    useEffect(() => {
        if (refs.current.initScreenHeight != state.screen.screenSize[1])
            setStates(states => ({
                ...states,
                isFirstTime: false
            }))
    }, [
        state.screen.screenSize[1]
    ])

    useEffect(() => 
        actions.comments.getCommentsContainerHeight(
            refs.current.container.clientHeight - heightTohide
        ),
        [states.isComponentHidden, states.isCommentsForm]
    )
    return (
        <Container 
            isComponentHidden={states.isComponentHidden}
            transition={commentContent
                || (states.isFirstTime 
                    && refs.current.initScreenHeight !== state.screen.screenSize[1])
                || (!states.isFirstTime 
                    && (!form?.isSubmitting || states.isComponentHidden))
            }
            heightToHide={heightTohide}
            screenHeight={state.screen.screenSize[1]}
            ref={container => refs.current.container = container}
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
                {areThereComments
                    &&
                    <Hide 
                        type='archive'
                        onClick={() => 
                            {setStates(states => ({
                                ...states,
                                isCommentsForm: false
                            }))}
                        }
                        css={css`
                            ${tabButtonStyles(!states.isCommentsForm, '', true)}
                            transform: none;
                        `}
                    >
                        <SvgComments isActive={!states.isCommentsForm}/>
                    </Hide>
                }
                <Hide 
                    type='archive'
                    onClick={()=> {
                        setStates(states => ({
                            ...states,
                            isCommentsForm: true
                        }))}
                    }
                    css={css`
                        ${tabButtonStyles(
                            states.isCommentsForm,
                            state.theme.color
                        )}
                        transform: none;
                    `}
                >
                    <SvgAddComment isActive={states.isCommentsForm}/>
                </Hide>
            </ButtonsTab>
            <Content 
                isCommentsForm={states.isCommentsForm}  
                height={formHeight >= listHeight ? 'auto;' : `${listHeight}px;`}
            >
                <CommentsForm postId={postId} visible={states.isCommentsForm}/>
                {areThereComments
                    && 
                    <CommentsList 
                        postId={postId} 
                        visible={!states.isCommentsForm} 
                        isComponentHidden={states.isComponentHidden}    
                    />
                }
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

const tabButtonStyles = (
    isActive, 
    color,
    isCommentsList
) => css`
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

    :hover {
        svg {
            ${isCommentsList 
                ? css`
                    g {
                        stroke: black;
                        fill: black;
                    }
                `
                : css`
                    ellipse, path:first-of-type {
                        stroke: black;
                        fill: black;
                    }
                    path:nth-of-type(2) {
                        stroke: ${color};
                        fill: ${color};
                    }
                `
            }
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
        && css`transition: transform 1s ease-out;`
    }
    transform: ${props => 
        `translateY(${props.screenHeight}px) \
        translateY(-100vh) \
        translateY(${props.heightToHide}px);`
    };
`