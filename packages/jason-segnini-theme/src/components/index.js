import {connect, Global, css, styled, Head} from "frontity"
import Switch from "@frontity/components/switch"
import List from "./list"
import Post from "./post"
import Loading from "./loading"
import Error from "./error"
import Header from "./header"
import Background from "./background"
import Archive from "./archive"
import ShareTechMono from "../fonts/ShareTechMono-Regular.ttf"

const Root = ({state, actions}) => {
    const data = state.source.get(state.router.link)
    if (!data.isHome) actions.theme.welcome()
    const isWelcomeReceived = state.theme.isWelcomeReceived

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
                    @font-face {
                        font-family: 'Share Tech Mono';
                        src: url("${ShareTechMono}");
                    }

                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;

                        ::selection {
                            color: black;
                            background-color: #60d75a;
                        }
                    }

                    html {
                        font-family: 'Share Tech Mono';
                        background-color: black;
                        color: white;
                    }

                    body {
                        height: 100vh;
                        width: 100vw;
                    }
                `}
            />
            {isWelcomeReceived && <Background/>}
            {isWelcomeReceived && <Header/>}
            {isWelcomeReceived && <Archive/>}
            <Main 
                isMenuHidden={!state.theme.showMenu}
                isArchiveHidden={!state.theme.showArchive}
            >
                <Switch>
                    <Loading when={data.isFetching}/>
                    <List when={data.isArchive} postsPage/>
                    <Post when={data.isPost || data.isPage}/>
                    <Error when={data.isError}/>
                </Switch>
            </Main>
        </>
    )
}

export default connect(Root)

const defaultMainConfig = css`
    width: 50%;
    margin: 0 25%
`

const hiddenMenuMainConfig = css`
    width: 65%;
    margin-left: 10%;
`

const hiddenArchiveMainConfig = css`
    width: 65%;
    margin-left: 25%;
    margin-right: 10%;
`

const hiddenBothMainConfig = css`
    width: 80%;
    margin: 0 10%
`

const Main = styled.main`
    padding: 1em;
    ${props => 
        props.isMenuHidden 
            ? props.isArchiveHidden
                ? hiddenBothMainConfig
                : hiddenMenuMainConfig
            : props.isArchiveHidden
                ? hiddenArchiveMainConfig
                : defaultMainConfig}
    transition: width 1s ease-in-out,
        margin 1s ease-in-out;

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
