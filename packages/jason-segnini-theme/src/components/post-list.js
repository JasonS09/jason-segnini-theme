import {connect, styled} from "frontity"
import AnimatedText from "./animated-text"

const PostList = ({state, actions, maxnum, animationTimeout, animationSpeed}) => {
    const data = state.source.get(state.source.postsPage)

    const filteredPosts = (items, query) => {
        if (maxnum && maxnum < items.length) items.length = maxnum
        if (!query) return items

        return items.filter((item) => {
            const post = state.source[item.type][item.id]
            query = query.toLowerCase()

            return post.title.rendered.toLowerCase().includes(query)
                || post.excerpt.rendered.toLowerCase().includes(query)
        })
    }

    return (
        <Items>
            {data.isReady 
            && filteredPosts(data.items, data.searchQuery).map(
                    (item) => {
                    const post = state.source[item.type][item.id]
                    return (
                        <>
                            <AnimatedText 
                                key={item.id} 
                                link={post.link}
                                text={post.title.rendered}
                                data-timeout={animationTimeout}
                                data-speed={animationSpeed}
                                comp="a"
                            />
                            <br/>
                        </>
                    )}
                )
            }
            <PrevNextTab>
                {data.previous && (
                    <button
                    onClick={() => {
                        actions.router.set(data.previous)
                    }}
                    >
                        &#171; Prev
                    </button>
                )}
                {data.next && (
                    <button
                    onClick={() => {
                        actions.router.set(data.next)
                    }}
                    >
                        Next &#187;
                    </button>
                )}
            </PrevNextTab>
        </Items>
    )
}

export default connect(PostList)

const Items = styled.div`
    & > a {
        display: block;
        margin: 6px 0;
        font-size: 1.2em;
        color: steelblue;
        text-decoration: none;
    }
`

const PrevNextTab = styled.div`
    padding-top: 1.5em;

    & > button {
        background: #eee;
        text-decoration: none;
        padding: 0.5em 1em;
        color: #888;
        border: 1px solid #aaa;
        font-size: 0.8em;
        margin-right: 2em;
    }

    & > button:hover {
        cursor: pointer;
    }
`