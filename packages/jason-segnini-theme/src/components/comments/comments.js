import {connect, styled, css} from "frontity"
import {useState} from "react"
import {center} from "../../styles/common"
import Hide from "../common/hide"
import CommentsList from "./comments-list"
import CommentsForm from "./comments-form"

const Comments = ({state, postId}) => {
    const [states, setStates] = useState({})
    const formHeight = state.theme.commentsHeight.form
    const listHeight = state.theme.commentsHeight.list

    return (
        <Container 
            isComponentHidden={states.isComponentHidden}
            contentHeight={Math.max(formHeight, listHeight)}
            contentOffset={states.isCommentsForm ? formHeight : listHeight}
        >
            <ButtonsTab>
                <Hide 
                    type='archive' 
                    onClick={() => {
                        setStates(states => ({
                            ...states,
                            isComponentHidden: !states.isComponentHidden
                        })
                    )}}
                    css={hideStyles(states.isComponentHidden)}
                />
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
                <CommentsList postId={postId} visible={!states.isCommentsForm}/>
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
    min-height: 20vh;
    max-height: 75vh;
    padding: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
`

const ButtonsTab = styled.div`
    width: 100%;
    padding-left: 1em;
    padding-top: 10px;
    padding-bottom: 10px;
`

const Container = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    transition: margin 1s ease-out;
    margin-bottom: ${props => 
        props.isComponentHidden
            ? `-${props.contentHeight+20}px;`
            : `-${props.contentHeight-20-props.contentOffset}px;`
    };
`