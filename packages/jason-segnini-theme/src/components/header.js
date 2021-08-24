import {connect, styled} from "frontity"
import {expandWidth, expandHeight} from "../styles/keyframes"
import {useRef} from "react"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const Header = ({state}) => {
    const timeout = state.theme.startAnimationTimeout
    const compRef = useRef(null)

    const hideMenu = (hideButton, header) => {
        if (state.theme.showMenu) {
            hideButton.children[0].textContent = '>>'
            header.style.marginLeft = '-250px'
            state.theme.showMenu = false
            return
        }

        if (!state.theme.showMenu) {
            hideButton.children[0].textContent = '<<'
            header.style.marginLeft = 0
            state.theme.showMenu = true
        }
    }
    
    return (
        <>
            <AnimatedWrapper absolute right width="297" hideOffset="47" ref={compRef}>
                <Hide onClick={(event) => hideMenu(event.target, compRef.current)}>
                    <AnimatedText comp="h1" data-timeout={timeout} text="<<"/>
                </Hide>
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
    margin: 0 0 0 1em;

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

const Hide = styled.div`
    display: block;
    position: absolute;
    width: 48px;
    height: 41px;
    right: 0;
    padding: 2px 7px 0 4px;
    cursor: pointer;
    background-color: rgba(0,0,0,0.85);

    h1 {
        color: #60d75a;
    }

    ::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 1px;
        border-right: 1px solid #60d75a;
        border-bottom: 1px solid #60d75a;
        border-radius: 3px;
        animation: ${expandHeight} .15s ease-out forwards,
            ${expandWidth} .15s ease-out .15s forwards;
    }
`