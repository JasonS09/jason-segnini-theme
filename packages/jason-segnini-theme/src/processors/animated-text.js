import AnimatedText from "../components/common/animated-text"

const animatedText = {
    name: 'animatedText',

    priority: 9,

    test: ({node, state}) => {
        const data = state.source.get(state.router.link)

        if ((data.type === 'page' && !data.isHome) 
            || (data.type === 'post' && !data.isPostArchive)
            || (state.screen.isMobile && !data.isHome))
            return false

        const testComponents = () => 
            [
                'h1', 'h2', 'h3',
                'h4', 'h5', 'h6',
                'p', 'a', 'summary',
                'text', 'tspan'
            ].find(comp => comp === node.component)

        const testChildrenText = () =>
            node.children.find(child => 
                child.type !== 'text'
            )

        return node.type === 'element' 
            && testComponents()
            && !testChildrenText()
            && node.props['className'] !== 'nonAnimatedText'
    },

    processor: ({node, state}) => {
        const data = state.source.get(state.router.link)
        if (node.component === 'a'  
            && !node.props?.href?.startsWith('#'))
                node.props.link = node.props.href
      
        node.props['text'] = ''

        node.children.forEach(child =>
            node.props['text']+= child.content
        )

        node.children = []
        node.props['comp'] = node.component

        if (!node.props['data-speed'])
            node.props['data-speed'] = 20

        node.component = AnimatedText
        return node
    }
}

export default animatedText