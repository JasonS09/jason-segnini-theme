import AnimatedText from "../components/animated-text"

const animatedText = {
    name: "animatedText",

    priority: 9,

    test: ({node}) => node.children 
      && node.children[0].type === "text"
      && node.props["className"] === "animatedText",

    processor: ({ node }) => {
      if (node.component === "a" 
          && node.props?.href 
          && !node.props?.href?.startsWith("#"))
            node.props.link = node.props.href;
      
      node.props["text"] = node.children[0].content;
      node.children[0].content= "";
      node.props["comp"] = node.component;
      node.component = AnimatedText;
      return node;
    },
};

export default animatedText