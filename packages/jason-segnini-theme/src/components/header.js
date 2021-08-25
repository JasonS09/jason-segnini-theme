import {connect, styled, css} from "frontity"
import {useState} from "react"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Hide from "./hide"

const Header = ({state, actions}) => {
    const timeout = state.theme.startAnimationTimeout
    const isMenuHidden = state.theme.showMenu ? false : true
    const [menuMarginLeft, setMenuMarginLeft] = useState('0')

    const hideMenu = () => {
        if (state.theme.showMenu) setMenuMarginLeft('-250px')
        else setMenuMarginLeft('0')
        actions.theme.toggleMenu()
    }
    
    return (
        <>
            <AnimatedWrapper absolute right width="297" hideOffset="47" css={css`margin-left: ${menuMarginLeft}`}>
                <Hide isComponentHidden={isMenuHidden} onClick={() => hideMenu()}/>
                <HeaderContent>
                    <AnimatedText comp="h1" data-timeout={timeout} text="Jason E. Segnini Cubero"/>
                    <Menu>
                        <AnimatedText comp="a" data-timeout={timeout} link="/" text="Home"/>
                        <br/>
                        <AnimatedText comp="a" data-timeout={timeout} link="/about-me" text="About Me"/>
                        <br/>
                        <AnimatedText comp="a" data-timeout={timeout} link="/blog" text="Blog"/>
                        <br/>
                        <AnimatedText comp="a" data-timeout={timeout} link="/contact" text="Contact"/>
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

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 0%;
            background-color: #60d75a;
            z-index: -1;
            border-radius: 2px;
        }

        &:hover::before {
            width: 100%;
            transition: width .5s ease-out;
        }

        &:hover {
            color: black;
            transition: color .5s ease-out;
        }
    }
`