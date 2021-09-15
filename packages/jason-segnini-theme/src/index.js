import Root from "./components"
import link from "@frontity/html2react/processors/link"
import animatedText from "./processors/animated-text"
import categories from "./handlers/categories"

const jasonSegniniTheme = {
    name: 'jason-segnini-theme',
    roots: {
        theme: Root
    },
    state: {
        theme: {
            isWelcomeReceived: false,
            showMenu: true,
            showArchive: true,
            color: '#60d75a',
            screenSize: [0, 0]
        }
    },
    actions: {
        theme: {
            init: ({libraries}) =>
                libraries.source.handlers.push(categories),

            beforeSSR: async ({state, actions}) => {
                await Promise.all([
                    actions.source.fetch(state.source.postsPage),
                    actions.source.fetch(state.source.catsPage)
                ])
            },

            welcome: ({state}) =>
                state.theme.isWelcomeReceived = true,
      
            toggleMenu: ({state}) =>
                state.theme.showMenu = !state.theme.showMenu,

            toggleArchive: ({state}) =>
                state.theme.showArchive = !state.theme.showArchive,

            setThemeColor: ({state}) => color =>
                state.theme.color = color,

            setScreenSize: ({state}) => (width, height) => {
                state.theme.screenSize[0] = width
                state.theme.screenSize[1] = height
            }    
        }
    },
    libraries: {
        html2react: {
            processors: [animatedText, link]
        }
    }
}

export default jasonSegniniTheme

