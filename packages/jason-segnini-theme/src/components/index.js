import { connect, Global, css, styled, Head } from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"
import List from "./list"
import Post from "./post"
import Page from "./page"
import Loading from "./loading"
import Error from "./error"
import portrait from "../images/portrait.jpg"
import headerbackground from "../images/header-background.png"
import SearchBar from "./searchbar"

const Root = ({state, actions}) => {
    const data = state.source.get(state.router.link)

    return (
        <>
        <Head>
            <title>Jason Segnini Theme</title>
            <meta
                name="Description"
                content="Jason Segnini theme, developed with Frontity."
            />
        </Head>
        <Global
            styles={css`
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                html {
                    font-family: system-ui, Verdana, Arial, sans-serif;
                    background-color: #2C2C2C;
                    color: white;
                }
            `}
        />
        <Header isPostType={data.isPostType} isPage={data.isPage}>
            <OuterPortraitContainer>
                <InnerPortraitContainer>
                    <img src={portrait}/>
                </InnerPortraitContainer>
            </OuterPortraitContainer>
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
            </HeaderContent>
        </Header>
        <Main>
            <SearchBar/>
            <Switch>
                <Loading when={data.isFetching}/>
                <List when={data.isArchive}/>
                <Post when={data.isPost}/>
                <Page when={data.isPage}/>
                <Error when={data.isError}/>
            </Switch>
        </Main>
        </>
    )
}

export default connect(Root)

const InnerPortraitContainer = styled.div`
    height: 175px;
    float: left;
    border-width: 0 8px 8px 0;
    border-style: solid;
    margin-right: 5px;
    padding: 2px;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`

const OuterPortraitContainer = styled.div`
    height: 175px;
    float: left;
    border-width: 0 3px 8px 0;
    border-style: solid;
    margin-left: 1em;
`

const Header = styled.header`
    background-image:url(${headerbackground});
    border-width: 0 0 8px 0;
    max-height: 175px;
    border-style: solid;

    &,${InnerPortraitContainer},${OuterPortraitContainer} {
        border-color: ${props => props.isPostType ? (props.isPage ? 'lightseablue' : '#29BC2D') : "lightseagreen"};
    }

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
const Main = styled.main`
    max-width: 800px;
    padding: 1em;
    margin: auto;

    img {
        max-width: 100%;
    }

    h2 {
        margin: 0.5em 0;
    }

    p {
        line-height: 1.25em;
        margin-bottom: 0.75em;
    }

    figcaption {
        color: #828282;
        font-size: 0.8em;
        margin-bottom: 1em;
    }
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