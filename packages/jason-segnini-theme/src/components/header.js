import {connect,styled, css} from "frontity"
import Link from "@frontity/components/link"
import SearchBar from "./searchbar"
import AnimatedBox from "./animated-boxes"

const Header = ({state,actions}) => (
    <>
        <StyledHeader>
            <HeaderContent>
                <h1>Jason E. Segnini Cubero</h1>
                { state.theme.isUrlVisible 
                ? <>Current URL: {state.router.link}<Button onClick={actions.theme.toggleUrl}>&#x3c; Hide Url</Button></> 
                : <Button onClick={actions.theme.toggleUrl}>Show Url &#x3e;</Button>}
                <Menu>
                    <Link link="/">Home</Link>
                    <br/>
                    <Link link="/about-us">About Me</Link>
                    <br/>
                    <Link link="/contact">Contact</Link>
                </Menu>
                <SearchBar/>
            </HeaderContent>
        </StyledHeader>
    </>
)

export default connect(Header)

const StyledHeader = styled.div`
    width: 250px;
    height: 100%;
    background-color: black;
    position: absolute;

    h1 {
        color: #60d75a;
    }
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

const Button = styled.button`
    background: transparent;
    border: none;
    color: #aaa;

    :hover {
        cursor: pointer;
        color: #888;
    }
`