import { connect, styled, css } from "frontity"
import AnimatedWrapper from "../common/animated-wrapper"

const Comment = ({
    state, 
    libraries, 
    id, 
    isChildren
}) => {
    const comment = state.source.comment[id]
    const Html2React = libraries.html2react.Component

    return (
        <AnimatedWrapper
            type='polygonal' 
            css={css`
                margin-bottom: 10px;
                ${isChildren && wrapperForChildren}
            `}
        >
            <Author>
                {comment.author_name || 'Anonymous'}:
            </Author>
            <CommentContent>
                <Html2React 
                    html={comment.content.rendered}
                />
                {!isChildren 
                    && 
                    <Reply color={state.theme.color}>
                        <span>Reply</span>
                    </Reply>
                }
            </CommentContent>
        </AnimatedWrapper>
    )
}

export default connect(Comment)

const wrapperForChildren = css`
    width: 80%;
    right: 0;
`

const Reply = styled.div`
    position: relative;
    width: 100%;
    text-align: right;
    color: ${props => props.color};
    span {cursor: pointer;}
`

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`padding: 10px 1em 10px;`