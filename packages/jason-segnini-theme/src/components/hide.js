import {connect, styled, css} from "frontity"
import {glow, setBackgroundColor} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Switch from "@frontity/components/switch"

const Hide = ({state, right, isComponentHidden, ...rest}) => {

    const setText = () => {
        if (right) {
            if (isComponentHidden) return "<"
            return ">"
        }

        if (isComponentHidden) return ">"
        return "<"
    }

    return (
        <Switch>
            <OuterWrapper when={right} right {...rest}>
                <AnimatedWrapper shadows css={wrapperStyles(true)}>
                        <HideButton right>
                            <AnimatedText comp="h1" text={setText()}/>
                        </HideButton>
                </AnimatedWrapper>
            </OuterWrapper>
            <OuterWrapper {...rest}>
                <HoverShadow>
                    <AnimatedWrapper css={wrapperStyles()}>
                        <StyledBorder/>
                        <HideButton>
                            <AnimatedText comp="h1" text={setText()}/>
                        </HideButton>
                    </AnimatedWrapper>
                </HoverShadow>
            </OuterWrapper>
        </Switch>
    )
}

export default connect(Hide)

const leftConfig = css`
    width: 47px;
    height: 40px;
    right: 9%;
    animation: ${glow()} 3s ease-out infinite alternate;
`

const center = css`
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`

const wrapperStyles = (right) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    ${right 
        ? "border-radius: 50%;"
        : css`
            right: 0;
            clip-path: polygon(
                0% 0%, 
                66% 0, 
                100% 26%, 
                100% 74%, 
                66% 100%, 
                0 100%
            );
        `
    };

    ::before {
        z-index: 1;
    }

    ::before, ::after {
        border-width: 2px;
        ${right && "border-radius: 50%;"};
    }
`

const HoverShadow = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: filter .25s ease-out;
    ${center}

    :hover {
        filter: drop-shadow(0 0 3px rgba(96, 215, 90, 0.5))
    }
`

const StyledBorder = styled.div`
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    clip-path: polygon(
        0% 0%, 
        100% 0%, 
        100% 100%, 
        0% 100%, 
        100% 70%, 
        100% 30%
    );
    z-index: 1;
    animation: 
        ${setBackgroundColor} .10s ease-out .20s forwards;
`

const HideButton = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: box-shadow .25s ease-out;
    ${props => props.right 
        && "border-radius: 50%;"
    }

    h1 {
        position: absolute;
        color: #60d75a;
        text-align: center;
        transition: text-shadow .25s ease-out;
        ${props => props.right 
            ? "padding-left: 4px;"
            : "padding-right: 6px;"
        }
        ${center}
    }
`

const rightConfig = css`
    width: 47px;
    height: 43px;
    left: 9%;
    border-radius: 50%;
    
    :hover {
        ${HideButton} {
            box-shadow: 0 0 10px 0 #60d75a;
        }
    } 
`

const OuterWrapper = styled.div`
        position: absolute;
        top: 3%;
        cursor: pointer;
        ${props => props.right ? rightConfig : leftConfig}
        transition: transform .25s ease-out;

        :hover {
            transform: scale(1.03, 1.03);

            ${HideButton} {
                h1 {
                    text-shadow: 0 0 7px #60d75a;
                }
            }
        }
`