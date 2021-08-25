import {connect, styled, css} from "frontity"
import {expandHeight, expandWidth} from "../styles/keyframes"
import AnimatedText from "./animated-text"

const Hide = ({state, right, isComponentHidden, ...rest}) => {
    const timeout = state.theme.startAnimationTimeout

    const setText = () => {
        if (right) {
            if (isComponentHidden) return "<<"
            return ">>"
        }

        if (isComponentHidden) return ">>"
        return "<<"
    }

    return (
        <HideButton right={right} {...rest}>
            <AnimatedText comp="h1" data-timeout={timeout} text={setText()}/>
        </HideButton>
    )
}

export default connect(Hide)

const leftConfig = css`
    right: 0;
    padding: 2px 7px 0 4px;

    ::before {
        right: 0;
        border-right: 1px solid #60d75a;
    }
`

const rightConfig = css`
    left: 0;
    padding: 2px 4px 0 7px;

    ::before {
        left: 0;
        border-left: 1px solid #60d75a;
    }
`

const HideButton = styled.div`
    display: block;
    position: absolute;
    width: 48px;
    height: 41px;
    cursor: pointer;
    background-color: rgba(0,0,0,0.85);
    ${props => props.right ? rightConfig : leftConfig}

    h1 {
        color: #60d75a;
    }

    ::before {
        content: '';
        position: absolute;
        bottom: 1px;
        border-bottom: 1px solid #60d75a;
        border-radius: 3px;
        animation: ${expandHeight} .15s ease-out forwards,
            ${expandWidth} .15s ease-out .15s forwards;
    }
`