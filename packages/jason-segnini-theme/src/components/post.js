import {connect, Head, styled, css} from "frontity"
import dayjs from "dayjs"
import AnimatedWrapper from "./animated-wrapper"

const Post = ({state, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]

    const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
    const Html2React = libraries.html2react.Component

    return (
        <AnimatedWrapper css={wrapperStyles}>
            <StyledPost>
                <Head>
                    <title>{post.title.rendered}</title>
                    <meta name="Description" content={post.excerpt.rendered}/>
                </Head>
                {!data.isHome && <h2>{post.title.rendered}</h2>}
                {data.isPost 
                && <PostInfo>
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
        </AnimatedWrapper>
    )
}

export default connect(Post)

const wrapperStyles = css`
    background-color: rgba(0,0,0,0.85);
    transition: transform .25s ease-out;

    :hover {
        transform: scale(1.01, 1.01);
        transition: transform .25s ease-out;
    }

    :hover::before, :hover::after {
        border-width: 2px;
    }

    :hover::after {
        transition: border-width 0s;
    }

    :hover::before {
        box-shadow: 0 0 10px 2px #60d75a;
        transition: border-width 0s,
            box-shadow .25s ease-out;;
    }

    ::before, ::after {
        transition: border-width 0s ease-out .25s;
    } 
`

const StyledPost = styled.div`
    min-height: 50px;
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