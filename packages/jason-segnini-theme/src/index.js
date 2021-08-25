import Root from "./components"
import link from "@frontity/html2react/processors/link"
import animatedText from "./processors/animated-text"

const jasonSegniniTheme = {
  name: "jason-segnini-theme",
  roots: {
    theme: Root
  },
  state: {
    theme: {
      startAnimationTimeout: 3000,
      isBackgroundLoaded: false,
      showMenu: true,
      showArchive: true
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({state, actions}) => 
        await actions.source.fetch(state.source.postsPage),
      
      loadBackground: ({state}) => 
        state.theme.isBackgroundLoaded = !state.theme.isBackgroundLoaded,
      
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

