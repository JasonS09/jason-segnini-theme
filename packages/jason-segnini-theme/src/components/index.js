import {connect, Global, css, styled, Head} from "frontity"
import Switch from "@frontity/components/switch"
import List from "./list"
import Post from "./post"
import Loading from "./loading"
import Error from "./error"
import Header from "./header"
import Background from "./background"
import ShareTechMono from "../fonts/ShareTechMono-Regular.ttf"

const Root = ({state}) => {
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
                    @font-face {
                        font-family: 'Share Tech Mono';
                        src: url("${ShareTechMono}");
                    }
                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
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
            <Background/>
            <Header/>
            <Main>
                <Switch>
                    <Loading when={data.isFetching}/>
                    <List when={data.isArchive}/>
                    <Post when={data.isPost || data.isPage}/>
                    <Error when={data.isError}/>
                </Switch>
            </Main>
        </>
    )
}

export default connect(Root)

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
