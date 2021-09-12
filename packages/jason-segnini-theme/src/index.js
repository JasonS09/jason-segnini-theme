import Root from "./components"
import link from "@frontity/html2react/processors/link"
import animatedText from "./processors/animated-text"
import categories from "./handlers/categories"

const jasonSegniniTheme = {
  name: "jason-segnini-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {
      isWelcomeReceived: false,
      isBackgroundLoaded: false,
      showMenu: true,
      showArchive: true
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
      
      loadBackground: ({state}) => 
        state.theme.isBackgroundLoaded = true,
      
      toggleMenu: ({state}) =>
        state.theme.showMenu = !state.theme.showMenu,

      toggleArchive: ({state}) =>
        state.theme.showArchive = !state.theme.showArchive
    }
  },
  libraries: {
    html2react: {
      processors: [animatedText, link]
    }
  }
}

export default jasonSegniniTheme

