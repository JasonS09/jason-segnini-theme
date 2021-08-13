import {styled, keyframes, css} from "frontity"

const AnimatedBox = props => (
    <>
        {props.absolute
            ? 
            <MaskWrapper>
                <BeforeMask {...props}/>
                <AfterMask {...props}/>
            </MaskWrapper>
            :
            <AnimatedDiv {...props}></AnimatedDiv>}
    </>
)

export default AnimatedBox

const expandWidth = keyframes`
    from {width: 0;}
    to {width: 100%;}
`

const expandHeight = keyframes`
    from {height: 0;}
    to {height: 100%;}
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
const commonConfig = css`
    box-sizing: inherit;
    position: absolute;
    content: '';
    border: 1px solid transparent;
    border-radius: 3px;
`
const beforeConfig = css`
    top: 0;
    left: 0;
    border-top-color: ${({top}) => `${top && "#60d75a"}`};
    border-right-color: ${({right}) => `${right && "#60d75a"}`};
    animation: ${expandWidth} 0.25s ease-out forwards,
    ${expandHeight} 0.25s ease-out 0.25s forwards;
`
const afterConfig = css`
    right: 0;
    bottom: 0;
    animation: ${({bottom, left}) => `${
        (bottom && left) 
        ?
            `
                ${bottomBorderColor} 0s ease-out 0.5s forwards,
                ${leftBorderColor} 0s ease-out 0.5s forwards,
                ${expandWidth} 0.25s ease-out 0.5s forwards,
                ${expandHeight} 0.25s ease-out 0.75s forwards;
            `
        : (
            bottom 
            ?
                `   
                    ${bottomBorderColor} 0s ease-out 0.5s forwards,
                    ${expandWidth} 0.25s ease-out 0.5s forwards,
                    ${expandHeight} 0.25s ease-out 0.75s forwards;
                `
            : (
                left 
                &&
                    `
                        ${leftBorderColor} 0s ease-out 0.5s forwards,
                        ${expandWidth} 0.25s ease-out 0.5s forwards,
                        ${expandHeight} 0.25s ease-out 0.75s forwards;
                    `
                )
            )    
        }`
    };
`


const AnimatedDiv = styled.div`
    position: relative;
    border: 0;
    box-shadow: inset 0 0 0 1px black;

    &:before, &:after {
        ${commonConfig}
    }

    &:before {
        ${beforeConfig}
    }

    &:after {
        ${afterConfig}
    }
`

const MaskWrapper = styled.div`
    div {
        ${commonConfig}
    }
`
const BeforeMask = styled.div`
    ${beforeConfig}
`
const AfterMask = styled.div`
    ${afterConfig}
`
