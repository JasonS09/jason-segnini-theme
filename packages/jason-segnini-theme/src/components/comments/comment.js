import { connect, styled, css } from "frontity"
import { glowForText } from "../../styles/keyframes"
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

    const getSelectedText = () => {
        var text = '';
        if (window.getSelection) 
            text = window.getSelection().toString();
        else if (document.selection && document.selection.type != 'Control')
            text = document.selection.createRange().text;
        return text;
    }

    const getQuote = () => {
        const text = `${comment.author_name} said:\r\n${
            getSelectedText() || comment.content.plain
        }`
        const paragraphs = text.split(/\r?\n/)
        return paragraphs.map((p, i) =>
            i < paragraphs.length-1 ? `>${p}\r\n` : `>${p}`
        ).join('')
    }

    return (
        <>
            {comment.content.plain
                &&
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
                            <Html2React html={marked(comment.content.plain)}/>
                            <Options color={state.theme.color}>
                                <span 
                                    onClick={() => 
                                        actions.comments.updateFields(
                                            postId,
                                            {content: getQuote()}
                                        )
                                    }
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
            }
        </>
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

        :hover {
            animation: 
                ${glowForText()} 3s ease-out alternate infinite;
        }
    }
`

const Author = styled.div`
    padding-top: 10px;
    padding-left: 10px;
`

const CommentContent = styled.div`padding: 10px 1em 10px;`