import {connect,styled} from "frontity"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const Header = () => (
    <AnimatedWrapper absolute right width="250">
        <HeaderContent>
            <AnimatedText comp="h1" data-timeout="3000" text="Jason E. Segnini Cubero"/>
            <Menu>
                <AnimatedText comp="a" data-timeout="3000" link="/" text="Home"/>
                <br/>
                <AnimatedText comp="a" data-timeout="3000" link="/about-us" text="About Me"/>
                <br/>
                <AnimatedText comp="a" data-timeout="3000" link="/contact" text="Contact"/>
            </Menu>
        </HeaderContent>
    </AnimatedWrapper>
)

export default connect(Header)

const HeaderContent = styled.div`
    max-width: 175px;
    padding: 2em 1em;
    margin: 0 0 0 1em;

    h1 {
        min-height: 108px;
        color: #60d75a;
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