import {connect, styled, css} from "frontity"
import AnimatedText from "./animated-text"
import Link from "@frontity/components/link"

const List = ({
    state, 
    actions, 
    maxnum, 
    animationTimeout, 
    animationSpeed,
    isPostsPage,
    categories
}) => {
    const data = state.source.get(state.source.postsPage)
    const items = data.items

    const filteredPosts = (query, category) => {
        if (maxnum && maxnum < items.length) items.length = maxnum
        if (!query && !category) return items
        if (query) query = query.toLowerCase()

        return items.filter(item => {
            const post = state.source[item.type][item.id]

            if (query && category) {
                return (post.title.rendered.toLowerCase().includes(query)
                || post.excerpt.rendered.toLowerCase().includes(query)) 
                && post.categories.includes(category)
            }

            if (query) {
                return post.title.rendered.toLowerCase().includes(query)
                || post.excerpt.rendered.toLowerCase().includes(query)
            }

            if (category) {
                return post.categories.includes(category)
            }
        })
    }

    const getCategories = () => {
        let ids = []
        
        items.forEach(
            item => {
                state.source[item.type][item.id].categories.forEach(
                    category => {
                        if (!ids.includes(category)) ids.push(category)
                    }
                )
            }
        )

        let cats = []
        ids.forEach(id => cats.push(state.source["category"][id]))
        return cats
    }

    return (
        <Items>
            {data.isReady
            && (!categories 
                ? filteredPosts(data.searchQuery).map(
                    item => {
                    const post = state.source[item.type][item.id]
                    return (
                        <>{!isPostsPage
                            && <AnimatedText 
                                key={item.id} 
                                link={post.link}
                                text={post.title.rendered}
                                data-timeout={animationTimeout}
                                data-speed={animationSpeed}
                                comp="a"
                            />}
                        </>
                    )}
                )
                : getCategories().map(
                    item => (
                        <details>
                            <AnimatedText 
                                key={item.id} 
                                text={item.name}
                                data-timeout={animationTimeout}
                                data-speed={animationSpeed}
                                comp="summary"
                                css={css`cursor: pointer`}
                                />
                            <Ul>
                                {filteredPosts(null, item.id).map(
                                    jtem => {
                                        const post = state.source[jtem.type][jtem.id]
                                        return (
                                            <>{!isPostsPage
                                                && <Li>
                                                    <Link key={jtem.id} link={post.link}>
                                                        {post.title.rendered}
                                                    </Link>
                                                </Li>}
                                            </>
                                        )
                                    }
                                )}
                            </Ul>
                        </details>
                    )
                    
                ))
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

export default connect(List)

const Items = styled.div`
    a, summary {
        display: block;
        margin: 6px 0;
        color: #60d75a;
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

const Li = styled.li`
    margin-left: 1em;
`

const Ul = styled.ul`
    list-style-type: none;
`