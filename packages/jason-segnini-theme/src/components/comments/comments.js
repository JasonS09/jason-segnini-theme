import {styled, css} from "frontity"
import {useState, useRef, useEffect} from "react"
import {center} from "../../styles/common"
import Hide from "../common/hide"
import CommentsList from "./comments-list"
import CommentsForm from "./comments-form"

const Comments = ({postId}) => {
    const [states, setStates] = useState({})
    const container = useRef(null)

    useEffect(() => setStates(states => ({
        ...states,
        height: container.current.clientHeight
    })), [states.isCommentsForm])

    return (
        <Container 
            isComponentHidden={states.isComponentHidden}
            height={states.height} 
            ref={container}
        >
            <ButtonsTab>
                <Hide 
                    type='archive' 
                    onClick={() => {setStates(states => ({
                        ...states,
                        isComponentHidden: !states.isComponentHidden
                    }))}}
                    css={hideStyles(states.isComponentHidden)}
                />
                <Hide 
                    type='archive'
                    text='+'
                    onClick={() => {setStates(states => ({
                        ...states,
                        isCommentsForm: true
                    }))}}
                    css={css`
                        ${tabButtonStyles(states.isCommentsForm)}
                        transform: none;
                    `}
                />
            </ButtonsTab>
            {states.isCommentsForm 
                ? <CommentsForm postId={postId}/>
                : <CommentsList postId={postId}/>
            }
        </Container>
    )
}

export default Comments

const hideStyles = isComponentHidden => css`
    position: relative;
    display: inline-block;
    height: 47px;
    top: auto;
    right: auto;
    left: auto;
    margin-right: 10px;
    ${isComponentHidden
        ? css`transform: rotate(-90deg);`
        : css`transform: rotate(90deg);`
    }
`

const tabButtonStyles = isActive => css`
    ${hideStyles()}
    & > div {
        ::before {
            ${center}
            ${isActive && 'width: 100%;'}
        }

        h1 {
            padding: 0;
            ${isActive && 'color: black;'}
        }
    }
`

const ButtonsTab = styled.div`
    display: block;
    width: 100%;
    padding-left: 1em;
    padding-top: 10px;
    padding-bottom: 10px;
`

const Container = styled.div`
    position: absolute;
    width: 100%;
    min-height: 20%;
    max-height: 75%;
    bottom: 0;
    transition: margin 1s ease-out;
    ${props => props.isComponentHidden
        && css`margin-bottom: calc(-${props.height}px + 67px);`
    }
`