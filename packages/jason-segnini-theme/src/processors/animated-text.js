import AnimatedText from "../components/common/animated-text"

const animatedText = {
    name: 'animatedText',

    priority: 9,

    test: ({node}) => node.props?.['data-is-cover-text'],

    processor: ({node}) => {
        node.props['text'] = node.children[0].content
        node.children = []
        node.props['comp'] = node.component
        node.component = AnimatedText
        return node
    }
}

export default animatedText