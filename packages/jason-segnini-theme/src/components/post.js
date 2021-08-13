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
            <PostContent>
                <Html2React html={post.content.rendered}/>
            </PostContent>
        </StyledPost>
    )
}

export default connect(Post)

const expandWidth = keyframes`
    from {width: 0;}
    to {width: 100%;}
`

const expandHeight = keyframes`
    from {height: 0;}
    to {height: 100%;}
`

const beforeBorderColor = keyframes`
    to {
        border-top-color: #60d75a;
        border-right-color: #60d75a;
    }
`

const afterBorderColor = keyframes`
    to {
        border-bottom-color: #60d75a;
        border-left-color: #60d75a;
    }
`

const StyledPost = styled.div`
    position: relative;
    background-color: black;
    border: 0;
    min-height: 50px;
    margin-top: 30%;
    box-shadow: inset 0 0 0 1px black;

    &:before, &:after {
        box-sizing: inherit;
        position: absolute;
        content: '';
        border: 1px solid transparent;
        border-radius: 3px;
    }

    &:before {
        top: 0;
        left: 0;
        animation: ${beforeBorderColor} 0s ease-out forwards,
        ${expandWidth} 0.25s ease-out forwards,
        ${expandHeight} 0.25s ease-out 0.25s forwards;
    }

    &:after {
        right: 0;
        bottom: 0;
        animation: ${afterBorderColor} 0s ease-out 0.5s forwards,
        ${expandWidth} 0.25s ease-out 0.5s forwards,
        ${expandHeight} 0.25s ease-out 0.75s forwards;
    }
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

const PostContent = styled.div`
    padding: 10px 1em 10px;
`