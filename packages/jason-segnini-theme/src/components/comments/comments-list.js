import {connect, styled} from "frontity"
import {useEffect, useRef} from "react"
import AnimatedWrapper from "../common/animated-wrapper"

const CommentsList = ({
    state, 
    actions,
    libraries, 
    postId,
    visible
}) => {
    const data = state.source.get(`@comments/${postId}`)
    const Html2React = libraries.html2react.Component
    const items = useRef(null)

    useEffect(() => {
        actions.source.fetch(`@comments/${postId}`)
        actions.theme.getCommentsListHeight(items.current.clientHeight)
    }, [data.items])

    return (
        <Items ref={items} visible={visible}>
            {data.isReady && data.items?.map(({id}) => (
                <AnimatedWrapper key={id} type='polygonal'>
                    <Author key={`author_${id}`}>
                        {state.source.comment[id].author_name || 'Anonymous'}:
                    </Author>
                    <CommentContent key={`comment_content_${id}`}>
                        <Html2React 
                            key={id}
                            html={state.source.comment[id].content.rendered}
                        />
                    </CommentContent>
                </AnimatedWrapper>
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

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`padding: 10px 1em 10px;`