import {connect, styled, css} from "frontity"
import {glow} from "../styles/keyframes"
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

    const wrapperStyles = css`
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        background-color: black;
        ${right 
        ? "border-radius: 50%;"
        : css`
                right: 0;
                clip-path: polygon(0% 0%, 66% 0, 100% 26%, 100% 74%, 66% 100%, 0 100%);
            `};

        ::before {
            z-index: 1;
        }

        ::before, ::after {
            border-width: 2px;
            ${right && "border-radius: 50%;"};
        }
    `

    return (
        <Switch>
            <OuterWrapper when={right} right {...rest}>
                <AnimatedWrapper shadows css={wrapperStyles}>
                        <HideButton right>
                            <AnimatedText comp="h1" text={setText()}/>
                        </HideButton>
                </AnimatedWrapper>
            </OuterWrapper>
            <OuterWrapper {...rest}>
                <HoverShadow>
                    <AnimatedWrapper css={wrapperStyles}>
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
    animation: ${glow} 3s ease-out infinite alternate;
`

const HoverShadow = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: filter .25s ease-out;

    :hover {
        filter: drop-shadow(0 0 3px rgba(96, 215, 90, 0.5))
    }
`

const StyledBorder = styled.div`
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    background-color: #60d75a;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 100% 70%, 100% 30%);
    z-index: 1;
`

const HideButton = styled.div`
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: box-shadow .25s ease-out;
    ${props => props.right 
        ? css`
            padding: 4px 5px 0 7px;
            border-radius: 50%;
        `
        : "padding: 1px 7px 0 5px;"}

    h1 {
        color: #60d75a;
        text-align: center;
        transition: text-shadow .25s ease-out;
    }
`

const rightConfig = css`
    width: 47px;
    height: 43px;
    left: 9%;
    border-radius: 50%;
    
    :hover {
        ${HideButton} {
            box-shadow: 0 0 10px 2px #60d75a;
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
            transform: scale(1.1, 1.1);

            ${HideButton} {
                h1 {
                    text-shadow: 0 0 7px #60d75a;
                }
            }
        }
`