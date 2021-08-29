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
        z-index: 1;
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
            <AnimatedWrapper css={wrapperStyles}>
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
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: box-shadow .25s ease-out;
    ${props => props.right 
        ? css`
            padding: 3px 5px 0 7px;
            border-radius: 50%;
        `
        : "padding: 3px 7px 0 5px;"}
    
    :hover {
        box-shadow: 0 0 10px 2px #60d75a;
        transition: box-shadow .25s ease-out;
    }

    h1 {
        color: #60d75a;
        text-align: center;
    }
`

const OuterWrapper = styled.div`
        position: absolute;
        width: 60px;
        height: 53px;
        top: 2%;
        ${props => props.right 
            ? css`
                left: 9%;
                border-radius: 50%;
            ` 
            : "right: 9%;"}
        background-color: rgba(0,0,0,0.85);
`