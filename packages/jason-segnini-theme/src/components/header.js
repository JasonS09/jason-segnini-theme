import {connect, styled, css, keyframes} from "frontity"
import {useState, useRef, useEffect} from "react"
import {glow, makeAppear} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Hide from "./hide"

const Header = ({state, actions}) => {
    const isMenuHidden = !state.theme.showMenu
    const active = state.router.link
    const [menuTexts, setMenuTexts] = useState({
        home: 'Home',
        aboutMe: 'About Me',
        blog: 'Blog',
        contact: 'Contact'
    })
    const [prevActive, setPrevActive] = useState('')
    const [contentWidth, setContentWidth] = useState(0)
    const ref = useRef(null)

    const randEffect = (item, text) => {
        const original = text
        let i = 0
        
        const generateText = (size) => {
            let j = 0

            const pushChar = (char) => {
                if (j < size) {
                    j++ 
                    return char 
                        + pushChar(String.fromCharCode(Math.random()*128))
                }

                return char
            }

            return pushChar(String.fromCharCode(Math.random()*128))
        }

        const animate = (newText) => {
            setMenuTexts(menuTexts => ({...menuTexts, [item]: newText}))

            if (i < text.length)  {
                setTimeout(animate, 30, generateText(text.length))
                i++
                return
            }

            if (newText != original)
                setTimeout(animate, 30, original)
        }

        animate(generateText(text.length))
    }

    useEffect(() => {
        if (ref.current && contentWidth === 0) {
            let padding = parseFloat(
                            getComputedStyle(
                                ref.current
                            ).paddingLeft)
                        + parseFloat(
                            getComputedStyle(
                                ref.current
                            ).paddingRight)
            let width = ref.current.clientWidth
            setContentWidth(width - padding)
        }
    })
    
    return (
        <>
            <AnimatedWrapper 
                absolute 
                right 
                width="297" 
                hideOffset="47" 
                isComponentHidden={isMenuHidden}
            >
                <Hide 
                    isComponentHidden={isMenuHidden} 
                    onClick={() => actions.theme.toggleMenu()}
                />
                <HeaderContent ref={ref}>
                    <AnimatedText comp="h1" text="Jason E. Segnini Cubero"/>
                    <Menu>
                        <AnimatedText 
                            comp="a" 
                            link="/" 
                            text={menuTexts.home} 
                            onMouseOver={() => randEffect('home', 'Home')}
                            onClick={() => setPrevActive(active)}
                            css={setMenuElementStyle(
                                    '/', 
                                    active, 
                                    prevActive, 
                                    contentWidth
                                )}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/about-me" 
                            text={menuTexts.aboutMe}
                            onMouseOver={() => randEffect('aboutMe', 'About Me')}
                            onClick={() => setPrevActive(active)}
                            css={setMenuElementStyle(
                                    '/about-me/', 
                                    active, 
                                    prevActive, 
                                    contentWidth
                                )}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/blog" 
                            text={menuTexts.blog}
                            onMouseOver={() => randEffect('blog', 'Blog')}
                            onClick={() => setPrevActive(active)}
                            css={setMenuElementStyle(
                                    '/blog/', 
                                    active, 
                                    prevActive, 
                                    contentWidth
                                )}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/contact" 
                            text={menuTexts.contact}
                            onMouseOver={() => randEffect('contact', 'Contact')}
                            onClick={() => setPrevActive(active)}
                            css={setMenuElementStyle(
                                    '/contact/', 
                                    active, 
                                    prevActive, 
                                    contentWidth
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

const changeColor = keyframes`
    from {color: black}
    to {color: #60d75a}
`

const setMenuElementStyle = (
    link,
    active, 
    prevActive, 
    contentWidth
) => css`

    ${
        active === link
            ? activeConfig
            : prevActive === link
                ? changeActive(contentWidth)
                : nonActiveConfig
    }

`

const activeConfig = css`
    text-shadow: 0 0 7px #60d75a;
    transition: text-shadow .5s ease-out;

    ::before {
        width: 5%;
        right: 0;
        animation: ${glow()} 3s ease-out alternate infinite;
    }
`

const nonActiveConfig = css`
    :hover {
        color: black;
        ::before {width: 100%;}
    }   
    ::before {width: 0;}
`

const changeActive = (contentWidth) => css`
    animation: ${changeColor} .5s ease-out 1;

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
        animation: ${makeAppear()} 1s ease-out forwards;
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

    h1 {
        color: #60d75a;
        min-height: 108px;
    }
`

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    margin: 1em 0;

    a {
        position: relative;
        color: #60d75a;
        text-decoration: none;
        max-height: 18.4px;
        transition: color .5s ease-out;
        overflow: hidden;
        ::before {transition: width .5s ease-out;}

        ::before, ::after {
            content: '';
            position: absolute;
            height: 100%;
            background-color: #60d75a;
            z-index: -1;
        }

        &, ::before, ::after {
            border-radius: 2px;
        }
    }
`