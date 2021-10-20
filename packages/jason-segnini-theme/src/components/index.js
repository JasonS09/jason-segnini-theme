import { connect, Global, css, styled, Head } from "frontity"
import { useEffect } from "react"
import { SwipeEventListener } from "swipe-event-listener"
import Switch from "@frontity/components/switch"
import PostList from "./post-list"
import Post from "./post"
import Loading from "./common/loading"
import Error from "./error"
import Header from "./header"
import Background from "./background"
import Archive from "./archive/archive"
import ShareTechMono from "../fonts/ShareTechMono-Regular.ttf"
import Orbitron from "../fonts/Orbitron-VariableFont_wght.ttf"
import Hacked from "../fonts/Hacked-KerX.ttf"

const Root = ({state, actions}) => {
    const data = state.source.get(state.router.link)

    if (!data.isHome && !state.theme.isWelcomeReceived) 
        actions.theme.welcome()

    const isWelcomeReceived = state.theme.isWelcomeReceived
    const color = state.theme.color
    const isMobile = state.screen.isMobile

    const swipeLeftHandler = e => {
        e.preventDefault()

        if (state.theme.showMenu)
            actions.theme.toggleMenu()
        else if (!state.theme.showArchive)
            actions.theme.toggleArchive()
    }

    const swipeRightHandler = e => {
        e.preventDefault()

        if (state.theme.showArchive) 
            actions.theme.toggleArchive()
        else if (!state.theme.showMenu)
            actions.theme.toggleMenu()
    }

    useEffect(() => {
        actions.screen.getScreenSize(
            window.innerWidth, window.innerHeight
        )

        if (window.screen.width <= 412) {
            if (state.theme.showArchive)
                actions.theme.toggleArchive()
            
            if (state.theme.showMenu)
                actions.theme.toggleMenu()

            actions.screen.setAsMobile()
        }

        window.addEventListener(
            'resize', 
            () => {
                if (window.innerWidth <= 412)
                    actions.screen.setAsMobile()
                else actions.screen.setAsMobile(false)
                actions.screen.getScreenSize(
                    window.innerWidth,
                    window.innerHeight
                )
            }
        )
    }, [])

    useEffect(() => {    
        if (data.isError)
            actions.theme.setThemeColor('#d75a5a')
        else
            actions.theme.setThemeColor('#60d75a')
    }, [data.isError])

    useEffect(() => {
        if (isMobile) {
            const { swipeArea } = SwipeEventListener({
                swipeArea: document.querySelector('body'),
            })

            swipeArea.addEventListener('swipeLeft', swipeLeftHandler)
            swipeArea.addEventListener('swipeRight', swipeRightHandler)
        }
    }, [isMobile])

    return (
        <>
            <Head>
                <title>Jason Segnini Theme</title>
                <meta
                    name='description'
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
                            box-shadow: 0 0 3px ${color};
                            :hover {background-color: ${color}}
                        }

                        ::-webkit-scrollbar-track-piece {display: none;}

                        ::selection {
                            color: black;
                            background-color: ${color};
                        }
                    }

                    html {
                        font-family: 'Share Tech Mono', monospace;
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
                    <Archive/>
                    <Header/> 
                </>
            }
            <Main
                color={color}
                figCapColor={!data.isError ? '#628a6c' : '#8a6262'}
                isMenuHidden={!state.theme.showMenu}
                isArchiveHidden={!state.theme.showArchive}
                onMouseUp={isMobile
                    ? e => {
                        if (e.defaultPrevented) return

                        if (state.theme.showMenu)
                            actions.theme.toggleMenu()
            
                        if (state.theme.showArchive)
                            actions.theme.toggleArchive()
                    } 
                    : undefined}
            >
                <Switch>
                    <Loading when={data.isFetching}/>
                    <PostList when={data.isArchive} postsPage animationSpeed='5'/>
                    <Post when={(data.isPost || data.isPage)}/>
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
    img {max-width: 100%;}
    p {line-height: 1.25em;}
    a {:link, :visited {color: ${props => props.color};}}

    figcaption {
        color: ${props => props.figCapColor};
        font-size: 0.8em;
        margin-bottom: 1em;
    }
`
