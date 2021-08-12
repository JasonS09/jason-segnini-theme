import React from "react"
import {connect, Head, styled, keyframes} from "frontity"
import dayjs from "dayjs"

const Post = ({state, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]

    const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
    const Html2React = libraries.html2react.Component

    return (
        <StyledPost>
            <Head>
                <title>{post.title.rendered}</title>
                <meta name="Description" content={post.excerpt.rendered}/>
            </Head>
            <AnimatedSvg>
                <Stroke rx="3" ry="3" width="100%" height="100%"/>
            </AnimatedSvg>
            {!data.isHome && <h2>{post.title.rendered}</h2>}
            {data.isPost && 
            <PostInfo>
                <p>
                    <strong>Posted: </strong>
                    {formattedDate}
                </p>
                <p>
                    <strong>Author: </strong>
                    {author.name}
                </p>
            </PostInfo>}
            <Html2React html={post.content.rendered}/>
        </StyledPost>
    )
}

export default connect(Post)

const sketchIn = keyframes`
    0% {
        stroke-dashoffset: 3000;
    }
    100% {
        stroke-dashoffset: 0;
    }
`

const sketchOut = keyframes`
    100% {
        stroke-width: 0;
    }
`

const showBorder = keyframes`
    100% {
      border-color: #60d75a;
    }
`

const StyledPost = styled.div`
    position: relative;
    background-color: black;
    border: 1px solid black;
    border-radius: 3px;
    min-height: 50px;
    animation: ${showBorder} 1s 3s forwards;
`

const PostInfo = styled.div`
    background-image: linear-gradient(to right, #f4f4f4, #fff);
    margin-bottom: 1em;
    padding: 0.5em;
    border-left: 4px solid lightseagreen;
    font-size: 0.8em;

    & > p {
        margin: 0;
    }
`

const AnimatedSvg = styled.svg`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const Stroke = styled.rect`
    stroke: #60d75a;
    stroke-width: 2px;
    stroke-dasharray: 3000;
    fill: none;
    animation: ${sketchIn} 5s 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards,
    ${sketchOut} 1s 4s forwards;
`