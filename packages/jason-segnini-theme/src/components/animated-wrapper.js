import {styled, keyframes, css} from "frontity"
import {expandWidth, expandHeight} from "../styles/keyframes"

const AnimatedWrapper = ({
    width = 0,
    hideOffset = 0,
    timeout = 0,
    absolute,
    right,
    ...rest
}) => {
    timeout = timeout/1000

    const setWidthForAbsolute = css`
        width: ${width}px;

        ::before {
            ${right ? css`right: ${hideOffset}px;` : css`left: ${hideOffset}px;`}
        }
    `

    const setAnimationsForAllBorders = css`
        ::before {
            animation: ${topBorderColor} 0s ease-out ${timeout}s forwards,
            ${rightBorderColor} 0s ease-out ${timeout}s forwards,
            ${expandWidth} .25s ease-out ${timeout}s forwards,
            ${expandHeight} .25s ease-out ${timeout+.25}s forwards;
        }

        ::after {
            animation: ${bottomBorderColor} 0s ease-out ${timeout+.5}s forwards,
            ${leftBorderColor} 0s ease-out ${timeout+.5}s forwards,
            ${expandWidth} 0.25s ease-out ${timeout+.5}s forwards,
            ${expandHeight} 0.25s ease-out ${timeout+.75}s forwards;
        }
    `
    
    return (
    <>
        {absolute 
            ? <AbsoluteAnimatedDiv
                right={right}
                css={css`${setWidthForAbsolute}`} 
                {...rest}
            ></AbsoluteAnimatedDiv>
            : <AllbordersAnimatedDiv 
                css={css`${setAnimationsForAllBorders}`} 
                {...rest}
            ></AllbordersAnimatedDiv>
        }
    </>
)}

export default AnimatedWrapper

const topBorderColor = keyframes`
    to {
        border-top-color: #60d75a;
    }
`

const rightBorderColor = keyframes`
    to {
        border-right-color: #60d75a;
    }
`

const bottomBorderColor = keyframes`
    to {
        border-bottom-color: #60d75a;
    }
`

const leftBorderColor = keyframes`
    to {
        border-left-color: #60d75a;
    }
`

const animateRight = css`
    border-right: 1px solid #60d75a;
`

const animateLeft = css`
    right: 0;

    ::before {
        right: 0;
        border-left: 1px solid #60d75a;
    }
`

const AbsoluteAnimatedDiv = styled.div`
    height: 100%;
    ${props => props.left && animateLeft}
    z-index: 1;
    transition: margin 1s ease-in-out;

    ::before {
        content: '';
        width: 100%;
        background-color: rgba(0,0,0,0.85);
        z-index: -1;
        ${props => props.right && animateRight}
        animation: ${expandHeight} 1s ease-out forwards;
    }

    &, ::before {
        position: absolute;
    }
`

const AllbordersAnimatedDiv = styled.div`
    position: relative;
    box-shadow: inset 0 0 0 1px black;

    ::before, ::after {
        content: '';
        box-sizing: inherit;
        position: absolute;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    ::before {
        top: 0;
        left: 0;
    }

    ::after {
        right: 0;
        bottom: 0;
    }
`
