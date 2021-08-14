import {styled, keyframes} from "frontity"
import {expandHeight} from "./keyframes"

const AnimatedWrapper = props => <AnimatedDiv {...props}></AnimatedDiv>

export default AnimatedWrapper

const expandWidth = keyframes`
    from {width: 0;}
    to {width: 100%;}
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

const AnimatedDiv = styled.div`
    position: relative;
    box-shadow: inset 0 0 0 1px black;

    &:before, &:after {
        content: '';
        box-sizing: inherit;
        position: absolute;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    &:before {
        top: 0;
        left: 0;
        border-top-color: #60d75a;
        border-right-color: #60d75a;
        animation: ${expandWidth} .25s ease-out forwards,
            ${expandHeight} .25s ease-out .25s forwards;
    }

    &:after {
        right: 0;
        bottom: 0;
        animation: ${bottomBorderColor} 0s ease-out .5s forwards,
            ${leftBorderColor} 0s ease-out .5s forwards,
            ${expandWidth} 0.25s ease-out .5s forwards,
            ${expandHeight} 0.25s ease-out .75s forwards;
    }
`
