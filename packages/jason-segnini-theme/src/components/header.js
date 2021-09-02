import {connect, styled, css} from "frontity"
import {useState} from "react"
import {hide} from "../scripts/hide"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Hide from "./hide"

const Header = ({state, actions}) => {
    const isMenuHidden = !state.theme.showMenu
    const [menuMarginLeft, setMenuMarginLeft] = useState('0')
    const [hideStyles, setHideStyles] = useState({})
    const [menuTexts, setMenuTexts] = useState({
        home: 'Home',
        aboutMe: 'About Me',
        blog: 'Blog',
        contact: 'Contact'
    })

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
    
    return (
        <>
            <AnimatedWrapper absolute right width="297" hideOffset="47" css={css`margin-left: ${menuMarginLeft}`}>
                <Hide 
                    isComponentHidden={isMenuHidden} 
                    onClick={() => hide(
                        state.theme.showMenu,
                        setHideStyles,
                        'padding: 0;',
                        setMenuMarginLeft,
                        'position: fixed; left: 1em;',
                        actions.theme.toggleMenu
                    )}
                    css={css`
                            ${hideStyles.outer}

                            & > div:first-of-type {
                                div:nth-of-type(3) {
                                    h1 {
                                        ${hideStyles.iconPadding}
                                    }
                                }
                            }
                        `}
                />
                <HeaderContent>
                    <AnimatedText comp="h1" text="Jason E. Segnini Cubero"/>
                    <Menu>
                        <AnimatedText 
                            comp="a" 
                            link="/" 
                            text={menuTexts.home} 
                            onMouseOver={() => randEffect('home', 'Home')}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/about-me" 
                            text={menuTexts.aboutMe}
                            onMouseOver={() => randEffect('aboutMe', 'About Me')}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/blog" 
                            text={menuTexts.blog}
                            onMouseOver={() => randEffect('blog', 'Blog')}
                        />
                        <br/>
                        <AnimatedText 
                            comp="a" 
                            link="/contact" 
                            text={menuTexts.contact}
                            onMouseOver={() => randEffect('contact', 'Contact')}
                        />
                    </Menu>
                </HeaderContent>
            </AnimatedWrapper>
        </>
    )
}

export default connect(Header)

const HeaderContent = styled.div`
    width: 175px;
    padding: 2em 1em;
    margin-left: 1em;
    margin-top: 1em;

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
        color: #60d75a;
        text-decoration: none;
        position: relative;

        ::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 0%;
            background-color: #60d75a;
            z-index: -1;
            border-radius: 2px;
        }

        :hover::before {
            width: 100%;
            transition: width .5s ease-out;
        }

        :hover {
            color: black;
            transition: color .5s ease-out;
        }
    }
`