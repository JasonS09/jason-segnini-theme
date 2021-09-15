import {connect, Global, css, styled, Head} from "frontity"
import {glow} from "../styles/keyframes"
import {useEffect} from "react"
import Switch from "@frontity/components/switch"
import List from "./list"
import Post from "./post"
import Loading from "./loading"
import Error from "./error"
import Header from "./header"
import Background from "./background"
import Archive from "./archive"
import ShareTechMono from "../fonts/ShareTechMono-Regular.ttf"
import Orbitron from "../fonts/Orbitron-VariableFont_wght.ttf"
import Hacked from "../fonts/Hacked-KerX.ttf"

const Root = ({state, actions}) => {
    const data = state.source.get(state.router.link)

    if (!data.isHome && !state.theme.isWelcomeReceived) 
        actions.theme.welcome()

    const isWelcomeReceived = state.theme.isWelcomeReceived
    const color = state.theme.color

    useEffect(() => {    
        window.addEventListener(
            'resize', 
            () => actions.theme.setScreenSize(
                window.innerWidth, window.innerHeight
            )
        )

        if (data.isError 
            && state.theme.color === '#60d75a')
                actions.theme.setThemeColor('#d75a5a')

        if (!data.isError 
            && state.theme.color === '#d75a5a')
                actions.theme.setThemeColor('#60d75a')
    }, [data.isError])

    return (
        <>
            <Head>
                <title>Jason Segnini Theme</title>
                <meta
                    name='Description'
                    content='Jason Segnini theme, developed with Frontity.'
                />
            </Head>
            <Global
                styles={css`
                    @font-face {
                        font-family: 'Share Tech Mono';
                        src: url('${ShareTechMono}');
                    }

                    @font-face {
                        font-family: 'Orbitron';
                        src: url('${Orbitron}') format('truetype-variations');
                        font-weight: 400 900;
                        font-stretch: 25% 150%;
                    }

                    @font-face {
                        font-family: 'Hacked';
                        src: url('${Hacked}');
                    }

                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        scrollbar-color: ${color} rgba(0,0,0,.85);
                        scrollbar-width: thin;

                        ::-webkit-scrollbar {
                            width: 10px;
                            background: transparent;
                        }

                        ::-webkit-scrollbar-thumb {
                            border: 1px solid ${color};
                            border-radius: 10px;
                            background-color: rgba(0,0,0,.85);
                            animation: 
                                ${glow(
                                    color, 2, 5
                                )} 3s ease-out alternate infinite;
                            :hover {background-color: ${color}}
                        }

                        ::-webkit-scrollbar-track-piece {display: none;}

                        ::selection {
                            color: black;
                            background-color: ${color};
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
                        overflow: hidden;

                        h1, h2, h3, h4, h5 {
                            font-family: 'Orbitron';
                            letter-spacing: 3px;
                            color: ${color};
                        }
                    }
                `}
            />
            {isWelcomeReceived && 
                <>
                    <Background/> 
                    <Header/> 
                    <Archive/>
                </>
            }
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
    position: relative;
    display: block;
    height: 100vh;
    padding: 1em 0;
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
