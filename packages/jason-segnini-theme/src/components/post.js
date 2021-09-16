import {connect, Head, styled, css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import dayjs from "dayjs"
import AnimatedWrapper from "./animated-wrapper"

const Post = ({state, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]
    const color = state.theme.color

    const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
    const Html2React = libraries.html2react.Component

    return (
        <AnimatedWrapper type='polygonal'>
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
            <PostContent>
                <Html2React html={post.content.rendered}/>
            </PostContent>
        </AnimatedWrapper>
    )
}

export default connect(Post)

const H2 = styled.h2`
    text-align: center;
    padding-top: 10px;
`

const PostInfo = styled.div`
    position: relative;
    margin-bottom: 1em;
    padding: 0.5em;
    font-size: 0.8em;
    
    p {
        margin: 0;
        :first-of-type {margin-top: 1em;}
    }

    ::before {
        content: '';
        position: absolute;
        height: 100%;
        border-width: 1px 0;
        border-style: solid;
        border-color: ${props => props.color};
        animation: 
            ${expandWidth(50)} .25s ease-out forwards;
    }
`

const PostContent = styled.div`
    padding: 10px 1em 10px;
`