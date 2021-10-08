import { connect, Head, styled, css } from "frontity"
import { expandWidth } from "../styles/keyframes"
import { select, getQuote } from "./scripts/utilities"
import { useState } from "react"
import dayjs from "dayjs"
import AnimatedWrapper from "./common/animated-wrapper"
import Comments from "./comments/comments"

const Post = ({state, actions, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]
    const color = state.theme.color
    const formattedDate = dayjs(post.date).format('DD MMMM YYYY')
    const Html2React = libraries.html2react.Component
    const [selection, setSelection] = useState('')

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
                    onMouseUp={() => {
                        if (select()+'') setSelection(select()+'')
                        else setSelection('')
                    }}
                >
                    <Html2React html={post.content.rendered}/>
                </PostContent>
                {data.isPost
                    &&
                    <Options color={color}>
                        {selection
                            &&
                            <span 
                                onMouseDown={() => {
                                    actions.comments.updateFields(
                                        data.id,
                                        {content: getQuote(
                                            author.name, selection
                                        )}
                                    )
                                    setSelection('')
                                }}
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

const H2 = styled.h2`
    text-align: center;
    padding-top: 10px;
    margin-bottom: 10px;
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
`

const PostContent = styled.div`
    color: ${props => props.color};
    padding: 10px 1em 10px;
`