import { connect, styled } from "frontity"
import { useEffect, useRef, Fragment } from "react"
import Comment from "./comment"

const CommentsList = ({
    state, 
    actions, 
    postId,
    visible,
    isComponentHidden
}) => {
    const form = state.comments.forms[postId]
    const data = state.source.get(`@comments/${postId}`)
    const items = useRef(null)

    useEffect(() => {
        actions.source.fetch(`@comments/${postId}`)
        actions.comments.getCommentsListHeight(items.current.clientHeight)
    }, [visible, isComponentHidden, form?.isSubmitted])

    return (
        <Items ref={items} visible={visible}>
            {data.isReady && data.items.map(({id, children}) => (
                <Fragment key={id}>
                    <Comment key={`comment_${id}`} id={id}/>
                    {children?.map(({id}) => 
                        <Comment key={`child_${id}`} id={id} isChildren/>
                    )}
                </Fragment>
            ))}
        </Items>
    )
}

export default connect(CommentsList)

const Items = styled.div`
    position: absolute;
    top: 10px;
    visibility: ${props => 
        props.visible ? 'visible;' : 'hidden;'};
    max-height: 75vh;
    width: 95%;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: scroll;
    overflow-x: hidden;
`