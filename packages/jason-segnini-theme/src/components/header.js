import {connect, styled, css, keyframes} from "frontity"
import {useState, useRef, useEffect} from "react"
import {glow, makeAppear} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Hide from "./hide"
import Logo from "./logo"

const Header = ({state, actions}) => {
    const isMenuHidden = !state.theme.showMenu
    const active = state.router.link
    const color = state.theme.color
    const [menuStates, setMenuStates] = useState({
        homeText: 'Home',
        aboutMeText: 'About Me',
        blogText: 'Blog',
        contactText: 'Contact',
        iHome: 0,
        iAboutMe: 0,
        iBlog: 0,
        iContact: 0,
        contentWidth: 0
    })
    const headerContent = useRef(null)
    const prevActive = useRef(active)

    const generateText = (size) => {
        let text = ''
        for (let i = 0; i < size; i++) 
            text += String.fromCharCode(Math.random()*128)
        return text
    }

    const randEffect = (item, iterator, text) => {
        if (menuStates[iterator] === text.length) {
            setMenuStates(
                menuStates => ({
                    ...menuStates, 
                    [item]: text,
                    [iterator]: 0
                })
            )
            return
        }

        if (menuStates[iterator] < text.length) {
            setMenuStates(
                menuStates => ({
                    ...menuStates, 
                    [item]: generateText(text.length),
                    [iterator]: menuStates[iterator]+1
                })
            )
        }
    }

    useEffect(() => {
        if (headerContent.current 
            && menuStates.contentWidth === 0) {
            const padding = parseFloat(
                            getComputedStyle(
                                headerContent.current
                            ).paddingLeft)
                        + parseFloat(
                            getComputedStyle(
                                headerContent.current
                            ).paddingRight)
            const width = headerContent.current.clientWidth
            setMenuStates(menuStates => ({
                ...menuStates,
                contentWidth: width-padding
            }))
        }
        prevActive.current = active
    }, [state.router.link])

    if (menuStates.iHome > 0)
        setTimeout(randEffect, 30, 'homeText', 'iHome', 'Home')

    if (menuStates.iAboutMe > 0)
        setTimeout(randEffect, 30, 'aboutMeText', 'iAboutMe', 'About Me')
        
    if (menuStates.iBlog > 0)
        setTimeout(randEffect, 30, 'blogText', 'iBlog', 'Blog')

    if (menuStates.iContact > 0)
        setTimeout(randEffect, 30, 'contactText', 'iContact', 'Contact')
    
    return (
        <>
            <AnimatedWrapper 
                type='absolute' 
                right 
                width="297" 
                hideOffset="47" 
                isComponentHidden={isMenuHidden}
            >
                <Hide 
                    isComponentHidden={isMenuHidden} 
                    onClick={() => actions.theme.toggleMenu()}
                />
                <HeaderContent ref={headerContent}>
                    <Logo/>
                    <Menu color={color}>
                        <AnimatedText 
                            comp="a" 
                            link="/" 
                            text={menuStates.homeText} 
                            onMouseOver={() => randEffect('homeText', 'iHome', 'Home')}
                            css={setMenuElementStyle(
                                    '/', 
                                    active, 
                                    prevActive.current, 
                                    menuStates.contentWidth,
                                    color
                                )}
                        />
                        <AnimatedText 
                            comp="a" 
                            link="/about-me" 
                            text={menuStates.aboutMeText}
                            onMouseOver={() => randEffect('aboutMeText', 'iAboutMe', 'About Me')}
                            css={setMenuElementStyle(
                                    '/about-me/', 
                                    active, 
                                    prevActive.current, 
                                    menuStates.contentWidth,
                                    color
                                )}
                        />
                        <AnimatedText 
                            comp="a" 
                            link="/blog" 
                            text={menuStates.blogText}
                            onMouseOver={() => randEffect('blogText', 'iBlog', 'Blog')}
                            css={setMenuElementStyle(
                                    '/blog/', 
                                    active, 
                                    prevActive.current, 
                                    menuStates.contentWidth,
                                    color
                                )}
                        />
                        <AnimatedText 
                            comp="a" 
                            link="/contact" 
                            text={menuStates.contactText}
                            onMouseOver={() => randEffect('contactText', 'iContact', 'Contact')}
                            css={setMenuElementStyle(
                                    '/contact/', 
                                    active, 
                                    prevActive.current, 
                                    menuStates.contentWidth,
                                    color
                                )}
                        />
                    </Menu>
                </HeaderContent>
            </AnimatedWrapper>
        </>
    )
}

export default connect(Header)

const changeSide = (contentWidth) => keyframes`
    to {transform: translateX(${-contentWidth}px);}
`

const expandAndContract = keyframes`
    0% {width: 5%}
    50% {width: 100%}
    100% {width: 0}
`

const changeColor = (color) => keyframes`
    from {color: black}
    to {color: ${color}}
`

const setMenuElementStyle = (
    link,
    active, 
    prevActive, 
    contentWidth,
    color
) => css`
    margin-bottom: 1em;
    ${active === link
        ? activeConfig(color)
        : prevActive === link
            ? changeActive(contentWidth, color)
            : nonActiveConfig
    }
`

const activeConfig = (color) => css`
    text-shadow: 0 0 7px ${color};
    transition: text-shadow .5s ease-out;

    ::before {
        width: 5%;
        right: 0;
        animation: 
            ${glow(color)} 3s ease-out alternate infinite;
    }
`

const nonActiveConfig = css`
    :hover {
        color: black;
        ::before {width: 100%;}
    } 

    ::before {width: 0;}
`

const changeActive = (contentWidth, color) => css`
    animation: ${changeColor(color)} .5s ease-out 1;

    :hover {
        color: black;
        ::before {width: 100%;}
    }

    ::after {
        right: 0;
        animation: ${expandAndContract} .5s ease-out forwards,
            ${changeSide(contentWidth)} .25s ease-out .25s forwards;
    }

    ::before {
        filter: opacity(0);
        animation: ${makeAppear()} 0s ease-out .5s forwards;
        width: 0;
    }
`

const HeaderContent = styled.div`
    position: relative;
    width: 175px;
    padding: 2em 1em;
    margin-left: 1em;
    margin-top: 1em;
    z-index: 2;
`

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 2em;

    a {
        position: relative;
        color: ${props => props.color};
        text-decoration: none;
        max-height: 18.4px;
        transition: color .5s ease-out;
        overflow: hidden;
        ::before {transition: width .5s ease-out;}

        ::before, ::after {
            content: '';
            position: absolute;
            height: 100%;
            background-color: ${props => props.color};
            z-index: -1;
        }

        &, ::before, ::after {
            border-radius: 2px;
        }
    }
`