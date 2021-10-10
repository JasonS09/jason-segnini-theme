import { connect, styled, css, keyframes } from "frontity"
import { useState, useRef, useEffect } from "react"
import { glow, makeAppear } from "../styles/keyframes"
import AnimatedText from "./common/animated-text"
import AnimatedWrapper from "./common/animated-wrapper"
import Hide from "./common/hide"
import Logo from "./logo"

const Header = ({state, actions}) => {
    const data = state.source.get(state.source.customRestPage)
    const items = data.menu
    const isMenuHidden = !state.theme.showMenu
    const active = state.router.link
    const color = state.theme.color

    const [menuStates, setMenuStates] = useState(() => {
        let menuStates = []

        items.forEach(item => {
            const menuItem = state.source[item.type][item.id]
            menuStates.push({
                title: menuItem.title,
                text: menuItem.title,
                link: menuItem.link,
                i: 0,
            })
        })

        return menuStates
    })

    const [contentWidth, setContentWidth] = useState(0)
    const refs = useRef({prevActive: active})
    let timeout = 0
    let menu = [...menuStates]
    let changeState = false

    const generateText = size => {
        let text = ''
        for (let i = 0; i < size; i++) 
            text += String.fromCharCode(Math.random()*128)
        return text
    }

    const randEffect = (item, iterator, title) => {
        if (iterator === title.length) {
            menu[item] = {
                ...menu[item],
                text: title,
                i: 0
            }
            return
        }

        if (iterator < title.length) {
            menu[item] = {
                ...menu[item],
                text: generateText(title.length),
                i: iterator+1
            }
        }
    }

    useEffect(() => {
        menuStates.forEach((item, i) => {
            if (item.i > 0) {
                changeState = true
                randEffect(i, item.i, item.title)
            }
        })

        if (changeState)
            timeout = setTimeout(setMenuStates, 30, menu)
    }, [menuStates])

    useEffect(() => {
        const headerContent = refs.current.headerContent
        const padding = parseFloat(
                        getComputedStyle(
                            headerContent
                        ).paddingLeft)
                    + parseFloat(
                        getComputedStyle(
                            headerContent
                        ).paddingRight)
        const width = headerContent.clientWidth
        setContentWidth(width-padding)
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() =>
        refs.current.prevActive = active, 
        [state.router.link]
    )

    return (
        <>
            <AnimatedWrapper 
                type='absolute' 
                right 
                width='297' 
                hideOffset='47' 
                isComponentHidden={isMenuHidden}
            >
                <Hide 
                    isComponentHidden={isMenuHidden} 
                    onClick={() => {
                        actions.theme.toggleMenu()

                        if (state.screen.isMobile 
                            && state.theme.showArchive)
                            actions.theme.toggleArchive()
                    }}
                />
                <HeaderContent ref={headerContent => 
                    refs.current.headerContent = headerContent
                }>
                    <Logo/>
                    <Menu color={color}>
                        {menuStates.map((item, i) =>
                            <AnimatedText
                                key={item.title}
                                comp='a'
                                link={item.link}
                                text={item.text}
                                onMouseOver={!state.screen.isMobile 
                                    ? () => {
                                        randEffect(i, item.i, item.title)
                                        setMenuStates(menu)
                                    }
                                    : undefined
                                }
                                css={setMenuElementStyle(
                                    item.link, 
                                    active, 
                                    refs.current.prevActive, 
                                    contentWidth,
                                    color
                                )}
                            />
                        )}
                    </Menu>
                </HeaderContent>
            </AnimatedWrapper>
        </>
    )
}

export default connect(Header)

const changeSide = contentWidth => keyframes`
    to {transform: translateX(${-contentWidth}px);}
`

const expandAndContract = keyframes`
    0% {width: 5%}
    50% {width: 100%}
    100% {width: 0}
`

const changeColor = color => keyframes`
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

const activeConfig = color => css`
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