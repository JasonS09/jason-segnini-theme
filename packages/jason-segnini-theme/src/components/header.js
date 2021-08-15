import {connect,styled} from "frontity"
import SearchBar from "./searchbar"
import {expandHeight} from "../styles/keyframes"
import AnimatedText from "./animated-text"

const Header = () => (
    <>
        <StyledHeader>
            <HeaderContent>
                <AnimatedText comp="h1" data-timeout="3000" text="Jason E. Segnini Cubero"/>
                <Menu>
                    <AnimatedText comp="a" data-timeout="3000" link="/" text="Home"/>
                    <br/>
                    <AnimatedText comp="a" data-timeout="3000" link="/about-us" text="About Me"/>
                    <br/>
                    <AnimatedText comp="a" data-timeout="3000" link="/contact" text="Contact"/>
                </Menu>
                <SearchBar/>
            </HeaderContent>
        </StyledHeader>
        <AnimatedBorder/>
    </>
)

export default connect(Header)

const StyledHeader = styled.div`
    position: absolute;
    width: 249px;
    background-color: black;
    height: 100%;
    z-index: 2;

    h1 {
        color: #60d75a;
    }
`
const AnimatedBorder = styled.div`
    position: absolute;
    width: 250px;
    top: 0;
    left: 0;
    z-index:1;
    background-color: black;
    border-right: 1px solid #60d75a;
    animation: ${expandHeight} 1s ease-out forwards;
`

const HeaderContent = styled.div`
    max-width: 175px;
    padding: 2em 1em;
    margin: 0 0 0 1em;
`

const Menu = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 1em;

    & > a {
        color: #60d75a;
        text-decoration: none;
    }

    & > a:hover {
        color: #60d75a;
    }
`