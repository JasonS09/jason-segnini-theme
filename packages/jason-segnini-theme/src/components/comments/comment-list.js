import {connect, styled} from "frontity"
import {useEffect} from "react"
import AnimatedWrapper from "../common/animated-wrapper"

const CommentList = ({
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

const Items = styled.div`
    position: absolute;
    width: 95%;
    top: calc(6% + 47px);
`

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`padding: 10px 1em 10px;`

export default connect(CommentList)