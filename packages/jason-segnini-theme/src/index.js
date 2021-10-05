import Root from "./components"
import link from "@frontity/html2react/processors/link"
import animatedText from "./processors/animated-text"
import customRest from "./handlers/custom-rest"

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
            color: '#60d75a'
        },

        comments: {
            replyComment: false,
            commentsHeight: {list: 0, form: 0}
        },

        screen: {
            screenSize: [0, 0]
        }
    },
    actions: {
        theme: {
            init: ({libraries}) =>
                libraries.source.handlers.push(customRest),

            beforeSSR: async ({state, actions}) =>
                await Promise.all([
                    actions.source.fetch(state.source.postsPage),
                    actions.source.fetch(state.source.customRestPage)
                ]),

            welcome: ({state}) =>
                state.theme.isWelcomeReceived = true,
      
            toggleMenu: ({state}) =>
                state.theme.showMenu = !state.theme.showMenu,

            toggleArchive: ({state}) =>
                state.theme.showArchive = !state.theme.showArchive,

            setThemeColor: ({state}) => color =>
                state.theme.color = color
        },

        comments: {
            getCommentsListHeight: ({state}) => height =>
                state.comments.commentsHeight.list = height,

            getCommentsFormHeight: ({state}) => height =>
                state.comments.commentsHeight.form = height
        },

        screen: {
            getScreenSize: ({state}) => (width, height) => {
                state.screen.screenSize[0] = width
                state.screen.screenSize[1] = height
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

