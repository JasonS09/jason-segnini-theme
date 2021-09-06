import {connect, styled} from "frontity"
import {useState} from "react"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Hide from "./hide"

const Header = ({state, actions}) => {
    const isMenuHidden = !state.theme.showMenu
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

        ::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 0;
            border-radius: 2px;
            background-color: #60d75a;
            z-index: -1;
        }

        :hover {
            color: black;
            transition: color .5s ease-out;

            ::before {
                width: 100%;
                transition: width .5s ease-out;
            }   
        }
    }
`