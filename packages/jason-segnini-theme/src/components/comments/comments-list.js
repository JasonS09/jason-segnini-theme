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
    const data = state.source.get(`@comments/${postId}`)
    const items = useRef(null)

    useEffect(() =>
        actions.comments.getCommentsListHeight(items.current.clientHeight),
        [visible, isComponentHidden]
    )

    return (
        <Items ref={items} visible={visible}>
            {data.isReady && data.items.map(({id, children}) =>
                <Fragment key={id}>
                    <Comment key={`comment_${id}`} postId={postId} id={id}/>
                    {children?.map(({id}) => 
                        <Comment 
                            key={`child_${id}`} 
                            postId={postId} 
                            id={id} 
                            isChildren    
                        />
                    )}
                </Fragment>
            )}
        </Items>
    )
}

export default connect(CommentsList)

const Items = styled.div`
    position: absolute;
    display: flex;
    gap: 10px;
    flex-direction: column;
    top: 10px;
    visibility: ${props => 
        props.visible ? 'visible;' : 'hidden;'};
    max-height: 50vh;
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: scroll;
    overflow-x: hidden;
`