import {connect,styled} from "frontity"
import Link from "@frontity/components/link"
import SearchBar from "./searchbar"

const Header = ({state,actions}) => {
    const data = state.source.get(state.router.link)

    return (
        <StyledHeader isPostType={data.isPostType} isPage={data.isPage}>
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
    )
}

export default connect(Header)

const StyledHeader = styled.header`
    border-width: 0 0 8px 0;
    max-height: 175px;
    border-style: solid;

    h1 {
        color: white;
    }
`
const HeaderContent = styled.div`
    max-width: 800px;
    height: 175px;
    padding: 2em 1em;
    margin: 0 0 0 13em;
`

const Menu = styled.nav`
    display: flex;
    flex-direction: row;
    margin-top: 1em;

    & > a {
        margin-right: 2em;
        color: white;
        text-decoration: none;
    }

    & > a:hover {
        color: #E1E1E1;
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