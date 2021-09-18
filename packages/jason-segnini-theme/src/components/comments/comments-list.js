import {connect, styled} from "frontity"
import {useEffect} from "react"
import AnimatedWrapper from "../common/animated-wrapper"

const CommentsList = ({
    state, 
    actions,
    libraries, 
    postId
}) => {
    const data = state.source.get(`@comments/${postId}`)
    const Html2React = libraries.html2react.Component
    useEffect(() => actions.source.fetch(`@comments/${postId}`), [])

    return (
        <Items>
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
    width: 95%;
    min-height: calc(20vh - 67px);
    max-height: calc(75vh - 67px);
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
`

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`padding: 10px 1em 10px;`