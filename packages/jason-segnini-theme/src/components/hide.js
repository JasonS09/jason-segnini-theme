import {connect, styled, css} from "frontity"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

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
        : "right: 0;"};

        ::before, ::after {
            border-width: 2px;
            border-style: double;
            ${right && "border-radius: 50%;"};
        }
    `

    return (
        <OuterWrapper right={right} {...rest}>
            <AnimatedWrapper shadows css={wrapperStyles}>
                <HideButton right={right}>
                    <AnimatedText comp="h1" text={setText()}/>
                </HideButton>
            </AnimatedWrapper>
        </OuterWrapper>
    )
}

export default connect(Hide)

const HideButton = styled.div`
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: box-shadow .10s ease-out;
    ${props => props.right 
        ? css`
            padding: 3px 5px 0 7px;
            border-radius: 50%;
        `
        : "padding: 3px 7px 0 5px;"}

    h1 {
        color: #60d75a;
        text-align: center;
        transition: text-shadow .10s ease-out;
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
            : "right: 9%;"}
        background-color: rgba(0,0,0,0.85);
        transition: transform .10s ease-out;

        :hover {
            transform: scale(1.01, 1.01);

            ${HideButton} {
                box-shadow: 0 0 10px 2px #60d75a;

                h1 {
                text-shadow: 0 0 7px #60d75a,
                    0 0 42px #60d75a,
                    0 0 82px #60d75a,
                    0 0 92px #60d75a,
                    0 0 102px #60d75a,
                    0 0 151px #60d75a;
                }
            }
        }
`