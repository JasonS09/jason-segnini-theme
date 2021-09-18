import AnimatedText from "../components/common/animated-text"

const animatedText = {
    name: 'animatedText',

    priority: 9,

    test: ({node}) => node.children?.[0]?.type === 'text'
        && node.props['className'] != 'nonAnimatedText',

    processor: ({node}) => {
        if (node.component === 'a'  
            && !node.props?.href?.startsWith('#'))
                node.props.link = node.props.href
      
        node.props['text'] = node.children[0].content
        node.children[0].content= ''
        node.props['comp'] = node.component

        if (!node.props['data-speed'])
            node.props['data-speed'] = 5

        node.component = AnimatedText
        return node
    },
};

export default animatedText