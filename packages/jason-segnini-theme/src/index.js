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
      isBackgroundLoaded: false
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({state, actions}) => 
        await actions.source.fetch(state.source.postsPage),
        
      loadBackground: ({state}) =>
        state.theme.isBackgroundLoaded = !state.theme.isBackgroundLoaded 
    }
  },
  libraries: {
    html2react: {
      processors: [animatedText,link]
    }
  }
}

export default jasonSegniniTheme

