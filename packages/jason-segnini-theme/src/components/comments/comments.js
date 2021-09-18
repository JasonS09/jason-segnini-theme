import {styled, css} from "frontity"
import {useState, useRef, useEffect} from "react"
import Hide from "../common/hide"
import CommentList from "./comment-list"

const Comments = ({postId}) => {
    const [states, setStates] = useState({isComponentHidden: false})
    const container = useRef(null)

    useEffect(() => setStates(states => ({
        ...states,
        height: container.current.clientHeight
    })), [])

    return (
        <Container 
            isComponentHidden={states.isComponentHidden}
            height={states.height} 
            ref={container}
        >
            <Hide 
                type='archive' 
                isComponentHidden={states.isComponentHidden}
                onClick={() => {setStates(states => ({
                    ...states,
                    isComponentHidden: !states.isComponentHidden
                }))}}
                css={hideStyles(states.isComponentHidden)}
            />
            <CommentList postId={postId}/>
        </Container>
    )
}

export default Comments

const hideStyles = hideStyles => css`
    position: absolute;
    height: 47px;
    top: 2%;
    right: 1%;
    left: auto;
    border-radius: 50%;
    ${hideStyles 
        ? css`transform: rotate(-90deg);`
        : css`transform: rotate(90deg);`
    }
`

const Container = styled.div`
    position: absolute;
    width: 100%;
    min-height: 20%;
    max-height: 75%;
    bottom: 0;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: margin 1s ease-in-out;
    ${props => props.isComponentHidden
        && css`margin-bottom: calc(-${props.height}px + 1% + 47px);`
    }
`