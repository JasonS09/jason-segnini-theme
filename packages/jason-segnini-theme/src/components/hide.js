import {connect, styled, css} from "frontity"
import {useState} from "react"
import {glow, setBackgroundColor} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import Switch from "@frontity/components/switch"

const Hide = ({state, right, isComponentHidden, ...rest}) => {
    const [hideStyles, setHideStyles] = useState(null)

    if (isComponentHidden && !hideStyles) {
        setTimeout(() => {
            setHideStyles(right 
                ? css`
                    position: fixed; 
                    left: auto; 
                    right: 1em;
                    width: 47px;
                    height: 43px;
                `
                : css`
                    position: fixed; 
                    left: 1em;
                    width: 47px;
                    height: 40px;
                `
            )
        }, 725)
    }
    else if (!isComponentHidden) {
        setTimeout(() => {
            setHideStyles(null)
        }, 300)
    }

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
            <OuterWrapper when={right} right css={hideStyles} {...rest}>
                <AnimatedWrapper shadows css={wrapperStyles(true)}>
                        <HideButton 
                            right 
                            isComponentHidden={isComponentHidden}
                        >
                            <AnimatedText comp="h1" text={setText()}/>
                        </HideButton>
                </AnimatedWrapper>
            </OuterWrapper>
            <OuterWrapper css={hideStyles} {...rest}>
                <Shadow/>
                <AnimatedWrapper css={wrapperStyles()}>
                    <StyledBorder/>
                    <HideButton isComponentHidden={isComponentHidden}>
                        <AnimatedText comp="h1" text={setText()}/>
                    </HideButton>
                    </AnimatedWrapper>
            </OuterWrapper>
        </Switch>
    )
}

export default connect(Hide)

const leftConfig = css`
    width: 15.8%;
    height: 5.3%;
    right: 9%;
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
    ${right 
        ? css`
            border-radius: 50%;
            background-color: rgba(0,0,0,0.85);
        `
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
    ${center}

    ::before {
        z-index: 1;
    }

    ::before, ::after {
        border-width: 2px;
        ${right && "border-radius: 50%;"};
    }
`

const Shadow = styled.div`
    animation: ${glow()} 3s ease-out alternate infinite;

    ::before {
        content: '';
        background-color: black;
        clip-path: polygon(
                0% 0%, 
                66% 0, 
                100% 26%, 
                100% 74%, 
                66% 100%, 
                0 100%
            );
    }

    &, ::before {
        position: absolute;
        width: 100%;
        height: 100%;
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
            ? props.isComponentHidden
                ? "padding-right: 2px;"
                : "padding-left: 4px;"
            : !props.isComponentHidden
               && "padding-right: 6px;"
        }
        ${center}
    }
`

const rightConfig = css`
    width: 15.8%;
    height: 5.7%;
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

            ${Shadow} {
                animation: 
                    ${glow(5, 9)} 1s ease-out alternate infinite;
            }
        }
`