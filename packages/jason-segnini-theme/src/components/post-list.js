import {connect, styled, css} from "frontity"
import {Fragment} from "react"
import {center} from "../styles/common"
import AnimatedText from "./common/animated-text"
import AnimatedWrapper from "./common/animated-wrapper"

const PostList = ({
    state,
    libraries, 
    actions,
    animationSpeed,
    postsPage,
    ...rest
}) => {
    const color = state.theme.color
    const data = postsPage 
                ? state.source.get(state.router.link)
                : state.source.get(state.source.postsPage)
    const items = data.items
    const Html2React = libraries.html2react.Component

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
                                color={color}
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
                                color={color}
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
            <Items color={color} postsPage={postsPage} {...rest}>
                {data.isReady
                    && items.map(item => {
                        const post = state.source[item.type][item.id]
                        return (
                            <Fragment key={item.id}>
                                {postsPage
                                    ? <Fragment key={item.id}>
                                        <AnimatedWrapper 
                                            key={item.id}
                                            type='polygonal'
                                            css={css`margin-bottom: 1em;`}
                                        >
                                            <Title key={`title_${item.id}`}>
                                                <AnimatedText
                                                    key={item.id}
                                                    comp='a'
                                                    link={post.link}
                                                    text={post.title.rendered}
                                                    data-speed={animationSpeed}
                                                    css={linkStyles(color)}
                                                />
                                            </Title>
                                            <Excerpt key={`excerpt_${item.id}`}>
                                                <Html2React 
                                                    key={item.id}
                                                    html={post.excerpt.rendered}
                                                />
                                            </Excerpt>
                                        </AnimatedWrapper>
                                    </Fragment>
                                    : <AnimatedText 
                                        key={item.id} 
                                        comp='a'
                                        link={post.link}
                                        text={post.title.rendered}
                                        data-speed={animationSpeed}
                                    />
                                }
                            </Fragment>
                        )
                    })
                }
            </Items>
        </>
    )
}

export default connect(PostList)

const linkStyles = color => css`
    font-family: 'Orbitron';
    font-size: 20px;
    letter-spacing: 3px;
    transition: text-shadow .25s ease-out;
    :hover {text-shadow: 0 0 7px ${color}}
`

const postsPageItems = css`
    position: relative;
    width: 100%;
    max-height: 93vh;
    padding-left: 1em;
    padding-right: 1em;
    overflow-y: scroll;
`

const H1 = styled.h1`
    position: absolute;
    padding-bottom: 1.5%;
    transition: color .25s ease-out;
    ${center}
`

const PrevNextTab = styled.div`
    position: relative;
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
        color: ${props => props.color};
        text-decoration: none;
    }
`

const Button = styled.div`
    font-family: 'Share Tech Mono';
    text-align: center;
    text-decoration: none;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-right: 2em;
    border: 0;
    background-color: transparent;
    z-index: 1;

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        left: 0;
        border-radius: 3px;
        background-color: ${props => props.color};
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

        ${H1} {color: black;}        
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