import Root from "./components"
import link from "@frontity/html2react/processors/link"
import animatedText from "./processors/animated-text"
import customRest from "./handlers/custom-rest"
import plainCommentContent from "./handlers/plain-comment-content"

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
            replyComment: 0,
            commentsHeight: {
                list: 0, 
                form: 0,
                container: 0
            }
        },

        screen: {
            screenSize: [0, 0],
            isMobile: false
        }
    },
    actions: {
        theme: {
            init: ({libraries}) => 
                libraries.source.handlers.push(
                    customRest, plainCommentContent
                ),

            beforeSSR: async ({state, actions}) =>
                await Promise.all([
                    actions.source.fetch(state.source.postsPage),
                    actions.source.fetch(state.source.customRestPage)
                ]),

            welcome: ({state}) =>
                state.theme.isWelcomeReceived = true,
      
            toggleMenu: ({state}) => show =>
                state.theme.showMenu = show || !state.theme.showMenu,

            toggleArchive: ({state}) => show =>
                state.theme.showArchive = show || !state.theme.showArchive,

            setThemeColor: ({state}) => color =>
                state.theme.color = color
        },

        comments: {
            getCommentsListHeight: ({state}) => height =>
                state.comments.commentsHeight.list = height,

            getCommentsFormHeight: ({state}) => height =>
                state.comments.commentsHeight.form = height,

            getCommentsContainerHeight: ({state}) => height =>
                state.comments.commentsHeight.container = height,

            setReplyComment: ({state}) => (id = 0) => 
                state.comments.replyComment = id
        },

        screen: {
            getScreenSize: ({state}) => (width, height) => {
                state.screen.screenSize[0] = width
                state.screen.screenSize[1] = height
                state.screen.isMobile = width <= 412 ? true : false
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

