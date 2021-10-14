import { connect, Head, styled, css } from "frontity"
import { expandWidth } from "../styles/keyframes"
import { select } from "../scripts/utilities"
import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"
import AnimatedWrapper from "./common/animated-wrapper"
import Comments from "./comments/comments"

const Post = ({state, actions, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]
    const color = state.theme.color
    const maxHeight = state.screen.screenSize[1] - 150 - state.comments.commentsHeight.container
    const formattedDate = dayjs(post.date).format('DD MMMM YYYY')
    const Html2React = libraries.html2react.Component
    const [selection, setSelection] = useState('')
    const ref = useRef(null)

    const onSelectionChange = () => {
        const selected = select()+''

        if (ref.current.textContent.includes(
                selected.replace(/[\n\r]/g, '')
            )) {
            setSelection(selected)
        }
        else setSelection('')
    }

    const onMouseDown = () => setSelection('')

    useEffect(() => {
        if (data.isPost) {
            if (state.screen.isMobile)
                document.addEventListener('selectionchange', onSelectionChange)
            else
                window.addEventListener('mousedown', onMouseDown)

            return () => {
                document.removeEventListener('selectionchange', onSelectionChange)
                window.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [])

    return (
        <>
            <AnimatedWrapper type='polygonal' css={wrapperStyles}>
                <Head>
                    <title>{post.title.rendered}</title>
                    <meta name="Description" content={post.excerpt.rendered}/>
                </Head>
                {!data.isHome && <H2>{post.title.rendered}</H2>}
                {data.isPost 
                    && 
                    <PostInfo color={color}>
                        <p>
                            <strong>Posted: </strong>
                            {formattedDate}
                        </p>
                        <p>
                            <strong>Author: </strong>
                            {author.name}
                        </p>
                    </PostInfo>
                }
                <PostContent
                    color={color}
                    maxHeight={(data.isPost && state.comments.commentsHeight.container) 
                        ? `${maxHeight}px` 
                        : 'none'
                    } 
                    onMouseUp={!state.screen.isMobile
                        ? () => setSelection(select()+'')
                        : undefined
                    }
                    ref={ref}
                >
                    <Html2React html={post.content.rendered}/>
                </PostContent>
                {data.isPost
                    &&
                    <Options color={color}>
                        {selection
                            &&
                            <span 
                                onMouseDown={() =>
                                    actions.comments.updateFields(
                                        data.id,
                                        {content: 
                                            '<blockquote>\r\n'
                                                +
                                                `${author.name} said:\r\n\r\n${selection}\r\n`
                                            +
                                            '</blockquote>'
                                        }
                                    )}
                            >Quote</span>
                        }
                    </Options>
                }
            </AnimatedWrapper>
            {data.isPost && <Comments postId={data.id}/>}
        </>
    )
}

export default connect(Post)

const H2 = styled.h2`
    text-align: center;
    padding-top: 10px;
    margin-bottom: 10px;
`

const Options = styled.div`
    position: relative;
    width: 100%;
    height: 25px;
    text-align: right;
    color: ${props => props.color};
    padding-bottom: 3px;
    padding-right: 5px;

    span {
        cursor: pointer;
        transition: text-shadow .25s ease-out;
        :hover {text-shadow: 0 0 2px ${props => props.color}}
    }
`

const PostInfo = styled.div`
    position: relative;
    margin-bottom: 1em;
    padding: 0.5em;
    font-size: 0.8em;
    p {margin: 0 !important;}

    ::before {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        border-width: 1px 0;
        border-style: solid;
        border-color: ${props => props.color};
        transition: border-width 0s .25s;
        animation: 
            ${expandWidth(50)} .25s ease-out forwards;
    }
`

const wrapperStyles = css`
    :hover{
        ${PostInfo} {
            ::before {
                border-top-width: 2px;
                border-bottom-width: 2px;
                transition: none;
            }
        }
    }

    div:nth-of-type(2) {padding-right: 5px;}
`

const PostContent = styled.div`
    max-height: ${props => props.maxHeight};
    color: ${props => props.color};
    text-align: justify;
    padding: 10px 1em 10px;
    overflow-y: scroll;
    transition: max-height 1s ease-out;
`