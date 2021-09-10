import {connect, styled, css} from "frontity"
import {useState} from "react"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const List = ({
    state,
    libraries, 
    actions, 
    maxnum,
    animationSpeed,
    postsPage,
    categories
}) => {
    const data = postsPage 
                ? state.source.get(state.router.link)
                : state.source.get(state.source.postsPage)
    const items = data.items
    const Html2React = libraries.html2react.Component

    const getCategoriesIds = () => {
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

        return ids
    }

    const catsIds = categories ? getCategoriesIds() : []

    const [reanimateListItem, setReanimateListItem] = useState(() => {
        let reanimates = {}
        catsIds.forEach(id => reanimates = {...reanimates, [id]: false})
        return reanimates
    })

    const getCategories = () => {
        let cats = []
        catsIds.forEach(id => cats.push(state.source["category"][id]))
        return cats
    }

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

    return (
        <Items>
            {data.isReady
            && (!categories 
                ? filteredPosts(postsPage ? data.searchQuery : null).map(
                    item => {
                        const post = state.source[item.type][item.id]
                        return (
                            <>{postsPage
                                ? <>
                                        <AnimatedWrapper 
                                            type='polygonal'
                                            key={item.id}
                                        >
                                            <Title>
                                                <AnimatedText
                                                    comp="a"
                                                    link={post.link}
                                                    text={post.title.rendered}
                                                    data-speed={animationSpeed}
                                                    css={linkStyles}
                                                />
                                            </Title>
                                            <Excerpt>
                                                <Html2React html={post.excerpt.rendered}/>
                                            </Excerpt>
                                        </AnimatedWrapper>
                                        <br/>
                                    </>
                                : <AnimatedText 
                                    key={item.id} 
                                    link={post.link}
                                    text={post.title.rendered}
                                    data-speed={animationSpeed}
                                    comp="a"
                                />}
                            </>
                        )
                    }
                )
                : getCategories().map(
                    item => (
                        <details>
                            <AnimatedText 
                                key={item.id} 
                                text={item.name}
                                data-speed={animationSpeed}
                                comp="summary"
                                onClick={() => 
                                    setReanimateListItem(reanimateListItem => ({
                                        ...reanimateListItem, [item.id]: !reanimateListItem[item.id]
                                    }))
                                }
                                css={css`cursor: pointer`}
                            />
                            <Ul>
                                {filteredPosts(null, item.id).map(
                                    jtem => {
                                        const post = state.source[jtem.type][jtem.id]
                                        return (
                                            <>{!postsPage
                                                && <Li>
                                                    <AnimatedText 
                                                        key={jtem.id} 
                                                        link={post.link}
                                                        text={post.title.rendered}
                                                        data-speed={animationSpeed}
                                                        comp="a"
                                                        reanimate={reanimateListItem[item.id]}
                                                        css={css`cursor: pointer`}
                                                    />
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

const linkStyles = css`
    font-family: 'Orbitron';
    font-size: 20px;
    letter-spacing: 3px;
    transition: text-shadow .25s ease-out;

    :hover {
        text-shadow: 0 0 7px #60d75a;
    }
`

const Title = styled.div`
    position: relative;
    display: inline-block;
    width: fit-content;
    max-width: 95%;
    padding-top: 10px;
    padding-left: 1em;
    z-index: 1;
`

const Excerpt = styled.div`
    padding: 10px 1em 10px;
`

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