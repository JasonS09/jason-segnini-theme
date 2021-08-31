import {connect, Head, styled, css} from "frontity"
import {glow} from "../styles/keyframes"
import dayjs from "dayjs"
import AnimatedWrapper from "./animated-wrapper"

const Post = ({state, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]

    const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
    const Html2React = libraries.html2react.Component

    return (
        <HoverShadow>
            <Shadow>
                <AnimatedWrapper css={wrapperStyles}>
                    <StyledBorder/>
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
            </Shadow>
        </HoverShadow>
    )
}

export default connect(Post)

const wrapperStyles = css`
    background-color: black;
    transition: transform .25s ease-out;
    clip-path: polygon(0% 0%, 95.3% 0, 100% 48.5%, 100% 100%, 0 100%);

    :hover {
        transform: scale(1.01, 1.01);

        ::before, ::after {
            border-width: 2px;
            transition: border-width 0s;
        }
    }

    ::before, ::after {
        transition: border-width 0s ease-out .25s;
    }
`

const Shadow = styled.div`
    animation: ${glow} 3s ease-out infinite alternate;
`
const HoverShadow = styled.div`
    transition: filter .25s ease-out;

    :hover {
        filter: drop-shadow(0 0 3px rgba(96, 215, 90, 0.5))
    }
`

const StyledBorder = styled.div`
    position: absolute;
    width: 5%;
    height: 50%;
    right: 0;
    top: 0;
    background-color: #60d75a;
    clip-path: polygon(0% 0%, 100% 0, 100% 100%);
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