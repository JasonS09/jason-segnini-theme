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
        width: 80%;
        height: 80%;
        top: 50%;
        transform: translateY(-50%);
        margin: auto;
        ${right 
        ? "border-radius: 50%;"
        : css`
                right: 0;
                clip-path: polygon(0% 0%, 66% 0, 100% 26%, 100% 74%, 66% 100%, 0 100%);
            `};

        ::before, ::after {
            border-width: 2px;
            ${right && "border-radius: 50%;"};
        }
    `

    return (
        <OuterWrapper right={right} {...rest}>
            <Switch>
                <AnimatedWrapper when={right} css={wrapperStyles}>
                    <HideButton right>
                        <AnimatedText comp="h1" text={setText()}/>
                    </HideButton>
                </AnimatedWrapper>
                <Shadow>
                    <AnimatedWrapper css={wrapperStyles}>
                        <StyledBorder/>
                        <HideButton>
                            <AnimatedText comp="h1" text={setText()}/>
                        </HideButton>
                    </AnimatedWrapper>
                </Shadow>
            </Switch>
        </OuterWrapper>
    )
}

export default connect(Hide)

const StyledBorder = styled.div`
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;
    background-color: #60d75a;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 100% 70%, 100% 30%);
`

const Shadow = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${glow} 3s ease-out infinite alternate;
`

const HideButton = styled.div`
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: box-shadow .25s ease-out;
    ${props => props.right 
        ? css`
            padding: 3px 5px 0 7px;
            border-radius: 50%;
        `
        : "padding: 3px 7px 0 5px;"}

    h1 {
        color: #60d75a;
        text-align: center;
        transition: text-shadow .25s ease-out;
    }
`

const OuterWrapper = styled.div`
        position: absolute;
        width: 60px;
        height: 53px;
        top: 2%;
        cursor: pointer;
        ${props => props.right 
            ? css`
                    left: 9%;
                    border-radius: 50%;
                ` 
            : css`
                    right: 9%;
                    clip-path: polygon(0% 0%, 75% 0, 100% 20%, 100% 80%, 75% 100%, 0 100%);
                `}
        background-color: black;
        transition: transform .25s ease-out;

        :hover {
            transform: scale(1.01, 1.01);

            ${HideButton} {
                ${props => props.right 
                    && "box-shadow: 0 0 10px 2px #60d75a;"}

                h1 {
                    text-shadow: 0 0 7px #60d75a;
                }
            }
        }
`