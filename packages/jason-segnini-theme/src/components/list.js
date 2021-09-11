import {connect, styled, css} from "frontity"
import {useState} from "react"
import {glow, glowForPolygon} from "../styles/keyframes"
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
                : (categories
                    ? state.source.get(
                        state.source.url + 'categories'
                    )
                    : state.source.get(
                        state.source.postsPage
                    ) 
                )
    const Html2React = libraries.html2react.Component
    const items = data.items

    const [reanimateListItem, setReanimateListItem] = useState(() => {
        let reanimates = {}
        items.forEach(
            category => reanimates = {
                ...reanimates, 
                [category.id]: false
            }
        )
        return reanimates
    })

    const filteredPosts = (query) => {
        if (maxnum && maxnum < items.length) items.length = maxnum
        if (!query) return items
        if (query) query = query.toLowerCase()

        return items.filter(item => {
            const post = state.source[item.type][item.id]

            return post.title.rendered.toLowerCase().includes(query)
                || post.excerpt.rendered.toLowerCase().includes(query)
        })
    }

    return (
        <>
            {postsPage 
                &&
                <PrevNextTab>
                    {data.previous
                        && 
                        <AnimatedWrapper
                            type="polygonal" 
                            css={wrapperStyles(true)}
                        >
                            <Button
                                onClick={() => {
                                    actions.router.set(data.previous)
                                }}
                            >
                                <h1>&#187;</h1>
                            </Button>
                        </AnimatedWrapper>
                    }
                    {data.next
                        && 
                        <AnimatedWrapper 
                            type="polygonal" 
                            css={wrapperStyles(data.previous, true)}
                        >
                            <Button
                                onClick={() => {
                                    actions.router.set(data.next)
                                }}
                            >
                                <h1>&#187;</h1>
                            </Button>
                        </AnimatedWrapper>
                    }
                </PrevNextTab>
            }
            <Items postsPage={postsPage}>
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
                                        />
                                    }</>
                                )
                            }
                        )
                        : items.map(
                            category => (
                                <details>
                                    <AnimatedText 
                                        key={category.id} 
                                        text={category.name}
                                        data-speed={animationSpeed}
                                        comp="summary"
                                        onClick={() => 
                                            setReanimateListItem(reanimateListItem => ({
                                                ...reanimateListItem, [category.id]: !reanimateListItem[category.id]
                                            }))
                                        }
                                        css={css`cursor: pointer`}
                                    />
                                    <Ul>
                                        {category.posts.map(
                                            post => {
                                                return (
                                                    <>{!postsPage
                                                        && <Li>
                                                            <AnimatedText 
                                                                key={post.id} 
                                                                link={post.link}
                                                                text={post.title}
                                                                data-speed={animationSpeed}
                                                                comp="a"
                                                                reanimate={reanimateListItem[category.id]}
                                                                css={css`cursor: pointer`}
                                                            />
                                                        </Li>
                                                    }</>
                                                )
                                            }
                                        )}
                                    </Ul>
                                </details>
                            )
                            
                        )
                    )
                }
            </Items>
        </>
    )
}

export default connect(List)

const linkStyles = css`
    font-family: 'Orbitron';
    font-size: 20px;
    letter-spacing: 3px;
    transition: text-shadow .25s ease-out;
    :hover {text-shadow: 0 0 7px #60d75a;}
`

const postsPageItems = css`
    position: relative;
    display: block;
    width: 100%;
    max-height: 93vh;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border: 1px solid #60d75a;
        border-radius: 10px;
        background-color: rgba(0,0,0,.85);
        animation: 
            ${glow(2, 5)} 3s ease-out alternate infinite;
        :hover {background-color: #60d75a;}
    }

    ::-webkit-scrollbar-track-piece {display: none;}
`

const PrevNextTab = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 5%;
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
    ${props => props.postsPage 
        && postsPageItems}

    a, summary {
        display: block;
        margin: 6px 0;
        color: #60d75a;
        text-decoration: none;
    }
`

const Button = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: 'Share Tech Mono';
    text-align: center;
    text-decoration: none;
    background-color: transparent;
    color: #60d75a;
    margin-right: 2em;
    border: 0;
    z-index: 1;
`

const wrapperStyles = (prev, next) => css`
    display: inline-block;
    width: 50%;
    height: 100%;
    ${(prev && !next)
        ? css`transform: scaleX(-1);`
        : (!prev && next) 
            && css`left: 50%`
    }
    transition: none;

    :hover {
        transform: ${(prev && !next) 
            ? 'scaleX(-1)'
            : 'none'
        };

        div {
            :first-of-type {
                animation: 
                    ${glowForPolygon(
                        3, 7, .85, 1
                    )} .25s ease-out forwards;
                ::before {background-color: #60d75a;}
            }

            :nth-of-type(2) {
                ::before, ::after {
                    border-width: 1px;
                    transition: none;
                }
            }
        }

        ${Button} {
            cursor: pointer;
            color: black;
        }        
    }

    div {
        :first-of-type {
            animation:
                ${glowForPolygon(
                        7, 3, 1, .85
                )} .25s ease-out 1,
                ${glowForPolygon()} 3s ease-out .25s alternate infinite;
                ::before {transition: background-color .25s ease-out;}
        }

        :nth-of-type(2) {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            ::before, ::after {transition: none;}
        }
    }
`

const Li = styled.li`margin-left: 1em;`

const Ul = styled.ul`list-style-type: none;`