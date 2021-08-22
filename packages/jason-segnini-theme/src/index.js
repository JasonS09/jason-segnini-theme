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
      startAnimationTimeout: 3000
    }
  },
  actions: {
    theme: {
      beforeSSR: async ({state, actions}) => 
        await actions.source.fetch(state.source.postsPage)
    }
  },
  libraries: {
    html2react: {
      processors: [animatedText,link]
    }
  }
}

export default jasonSegniniTheme

