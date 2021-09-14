import {connect, styled, css} from "frontity"
import {useState, useRef, useEffect} from "react"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const List = ({
    state,
    libraries, 
    actions, 
    maxnum,
    animationSpeed,
    postsPage,
    categories,
    ...rest
}) => {
    const data = postsPage 
                ? state.source.get(state.router.link)
                : (categories
                    ? state.source.get(
                        state.source.catsPage
                    )
                    : state.source.get(
                        state.source.postsPage
                    ) 
                )
    const items = data.items
    const Html2React = libraries.html2react.Component
    const details = useRef({})

    const [reanimateListItem, setReanimateListItem] = useState(() => {
        if (!categories) return null
        let reanimates = {}

        items.forEach(category => 
            reanimates = {
                ...reanimates, 
                [category.id]: {}
            }
        )
        
        return reanimates
    })

    const calculateDetailsHeight = (details, category, content) => 
        reanimateListItem[category].reanimate
            ? details.clientHeight - content.clientHeight
            : details.clientHeight + content.clientHeight

    const filteredPosts = query => {
        if (maxnum && maxnum < items.length) items.length = maxnum
        if (!query) return items
        query = query.toLowerCase()

        return items.filter(item => {
            const post = state.source[item.type][item.id]
            return post.title.rendered.toLowerCase().includes(query)
                || post.excerpt.rendered.toLowerCase().includes(query)
        })
    }

    useEffect(() => {
        if (details.current) {
            let reanimateListItemWithHeights = {}

            Object.keys(details.current).forEach(category => {
                const det = details.current[category]
                reanimateListItemWithHeights = {
                    ...reanimateListItemWithHeights,
                    [category]: {detailsHeight: det.clientHeight}
                }
            })

            setReanimateListItem(reanimateListItemWithHeights)
        }
    }, [])

    return (
        <>
            {postsPage 
                &&
                <PrevNextTab>
                    {data.previous
                        && 
                        <AnimatedWrapper
                            type='polygonal'
                            css={wrapperStyles(true)}
                        >
                            <Button
                                prev
                                onClick={() => 
                                    actions.router.set(data.previous)
                                }
                            >
                                <H1>&#187;</H1>
                            </Button>
                        </AnimatedWrapper>
                    }
                    {data.next
                        && 
                        <AnimatedWrapper 
                            type='polygonal' 
                            css={wrapperStyles(data.previous, true)}
                        >
                            <Button
                                onClick={() => 
                                    actions.router.set(data.next)
                                }
                            >
                                <H1>&#187;</H1>
                            </Button>
                        </AnimatedWrapper>
                    }
                </PrevNextTab>
            }
            <Items postsPage={postsPage} {...rest}>
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
                                                css={css`margin-bottom: 1em;`}
                                            >
                                                <Title>
                                                    <AnimatedText
                                                        comp='a'
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
                                        </>
                                        : <AnimatedText 
                                            key={item.id} 
                                            link={post.link}
                                            text={post.title.rendered}
                                            data-speed={animationSpeed}
                                            comp='a'
                                        />
                                    }</>
                                )
                            }
                        )
                        : items.map(
                            category => (
                                <Details 
                                    height={reanimateListItem[category.id].detailsHeight}
                                    ref={det => details.current = {
                                        ...details.current,
                                        [category.id]: det
                                    }}
                                >
                                    <AnimatedText 
                                        key={category.id} 
                                        text={category.name}
                                        data-speed={animationSpeed}
                                        comp='summary'
                                        onClick={event => {
                                            const det = details.current[category.id]
                                            event.preventDefault()
                                            det.open = true
                                            setReanimateListItem(reanimateListItem => ({
                                                ...reanimateListItem, 
                                                [category.id]: {
                                                    reanimate: !reanimateListItem[category.id].reanimate,
                                                    detailsHeight: calculateDetailsHeight(
                                                        det, 
                                                        category.id, 
                                                        det.firstElementChild.nextElementSibling
                                                    )
                                                }
                                            }))
                                        }}
                                        css={css`cursor: pointer`}
                                    />
                                    <Ul>
                                        {category.posts.map(
                                            post => {
                                                return (
                                                    <>{!postsPage
                                                        && <Li>
                                                            <AnimatedText 
                                                                key={post.ID} 
                                                                link={post.post_name}
                                                                text={post.post_title}
                                                                data-speed={animationSpeed}
                                                                comp='a'
                                                                reanimate={reanimateListItem[category.id].reanimate}
                                                                css={css`cursor: pointer`}
                                                            />
                                                        </Li>
                                                    }</>
                                                )
                                            }
                                        )}
                                    </Ul>
                                </Details>
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
`

const H1 = styled.h1`
    position: absolute;
    padding-bottom: 1.5%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Details = styled.details`
    ${props => props.height 
        && css`height: ${props.height}px;`}
    overflow: hidden;
    transition: height .25s ease-out;
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
    font-family: 'Share Tech Mono';
    text-align: center;
    text-decoration: none;
    color: #60d75a;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-right: 2em;
    border: 0;
    background-color: transparent;
    z-index: 1;
    transition: color .25s ease-out;

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        left: 0;
        border-radius: 3px;
        background-color: #60d75a;
        z-index: -1;
        transition: width .25s ease-out;
    }
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

        & > div {
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
            ::before {width: 100%;}
        }        
    }

    & > div {
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