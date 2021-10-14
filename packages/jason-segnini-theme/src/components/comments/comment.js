import { connect, styled, css } from "frontity"
import { select } from "../../scripts/utilities"
import { useEffect, useRef } from "react"

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
    const ref = useRef(null)
    let selection = ''

    const onSelectionChange = () => {
        const selected = select()+''

        if (ref.current.textContent.includes(
                selected.replace(/[\n\r]/g, '')
            )) {
            selection = selected
        }
        else selection = ''
    }

    const onMouseDown = () => selection = ''

    useEffect(() => {
        if (state.screen.isMobile)
            document.addEventListener('selectionchange', onSelectionChange)
        else
            window.addEventListener('mousedown', onMouseDown)

        return () => {
            document.removeEventListener('selectionchange', onSelectionChange)
            window.removeEventListener('mousedown', onMouseDown)
        }
    }, [])

    return (
        <Container isChildren={isChildren} color={state.theme.color}>
            <Author>
                {comment.author_name || 'Anonymous'}:
            </Author>
            <CommentContent 
                color={color} 
                onMouseUp={!state.screen.isMobile
                    ? () => selection = select()+''
                    : undefined
                }
                ref={ref}
            >
                <Html2React html={comment.content.rendered}/>
                <Options color={color}>
                    <span 
                        onMouseDown={() => 
                            actions.comments.updateFields(
                                postId,
                                 {content: 
                                    '<blockquote>\r\n'
                                        +
                                        `${comment.author_name} said:\r\n\r\n${
                                            selection || comment.content.rendered
                                        }\r\n`
                                    +
                                    '</blockquote>'
                                }
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
        </Container>
    )
}

export default connect(Comment)

const Container = styled.div`
    position: relative;
    border: 1px solid ${props => props.color};
    border-radius: 3px;
    background-color: rgba(0,0,0,.85);
    ${props => props.isChildren
        && css`
            width: 80%;
            left: 20%;
        `
    };
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