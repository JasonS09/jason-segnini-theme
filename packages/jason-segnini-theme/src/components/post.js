import {connect, Head, styled} from "frontity"
import dayjs from "dayjs"
import AnimatedBox from "./animated-boxes"

const Post = ({state, libraries},props) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]

    const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
    const Html2React = libraries.html2react.Component

    return (
        <AnimatedBox top right bottom left>
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
        </AnimatedBox>
    )
}

export default connect(Post)

const StyledPost = styled.div`
    background-color: black;
    min-height: 50px;
    margin-top: 30%;
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