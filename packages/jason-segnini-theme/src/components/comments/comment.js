import { connect, styled, css } from "frontity"
import { select, getQuote } from "../../scripts/utilities"
import { useEffect } from "react"
import marked from "marked"
import AnimatedWrapper from "../common/animated-wrapper"

const Comment = ({
    state, 
    actions,
    libraries,
    postId,
    id, 
    isChildren
}) => {
    const comment = state.source.comment[id]
    const Html2React = libraries.html2react.Component
    const color = state.theme.color
    let selection = ''
    const deselect = () => selection = ''

    useEffect(() => {
        window.addEventListener('mousedown', deselect)
        return () => window.removeEventListener('mousedown', deselect)
    }, [])

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
            <CommentContent 
                color={color} 
                onMouseUp={() => selection = select()+''}
            >
                <Html2React html={marked(comment.content.plain)}/>
                <Options color={color}>
                    <span 
                        onMouseDown={() => 
                            actions.comments.updateFields(
                                postId,
                                {content: getQuote(
                                    comment.author_name,
                                    selection || comment.content.plain
                                )}
                            )}
                        css={css`margin-right: 10px;`}
                    >Quote</span>
                    {!isChildren
                        &&
                        <span onClick={() => 
                            actions.comments.setReplyComment(id)
                        }>Reply</span>
                    }
                </Options>
            </CommentContent>
        </AnimatedWrapper>
    )
}

export default connect(Comment)

const wrapperForChildren = css`
    width: 80%;
    left: 20%;
`

const Options = styled.div`
    position: relative;
    width: 100%;
    text-align: right;
    color: ${props => props.color};

    span {
        cursor: pointer;
        transition: text-shadow .25s ease-out;
        :hover {text-shadow: 0 0 2px ${props => props.color}}
    }
`

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`
    padding: 10px 1em 10px;

    blockquote {
        border-left: 1px;
        border-left-color: ${props => props.color};
        border-left-style: solid;
        padding-left: 5px;
        margin-bottom: 5px;
    }
`