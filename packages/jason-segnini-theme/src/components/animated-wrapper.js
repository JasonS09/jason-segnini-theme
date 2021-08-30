import {styled, keyframes, css} from "frontity"
import {expandWidth, expandHeight} from "../styles/keyframes"
import Switch from "@frontity/components/switch"

const AnimatedWrapper = ({
    width = 0,
    hideOffset = 0,
    absolute,
    right,
    ...rest
}) => {
    const formatSizeProp = (prop) => {
        if (typeof(prop) != "string") return prop.toString()+'px'

        if (prop.endsWith('px')
            || prop.endsWith('em')
            || prop.endsWith('vh')
            || prop.endsWith('vw')
            || prop.endsWith('%'))
            return prop

        return prop+'px'
    }
    
    return (
        <Switch>
            <AbsoluteAnimatedDiv
                when={absolute && right}
                right
                width={formatSizeProp(width)}
                hideOffset={formatSizeProp(hideOffset)}
                {...rest}
            >
                <LightEffect 
                    absolute
                    right 
                    hideOffset={formatSizeProp(hideOffset)}                        
                />
                {rest.children}
            </AbsoluteAnimatedDiv>
            <WrapperForRight 
                when={absolute} 
                width={formatSizeProp(width)}
            >
                <AbsoluteAnimatedDiv 
                    width={formatSizeProp(width)}
                    hideOffset={formatSizeProp(hideOffset)}
                    {...rest}
                >
                    <LightEffect 
                        absolute
                        hideOffset={formatSizeProp(hideOffset)} 
                    />
                    {rest.children}
                </AbsoluteAnimatedDiv>
            </WrapperForRight>
            <AllbordersAnimatedDiv {...rest}>
                <LightEffect/>
                {rest.children}
            </AllbordersAnimatedDiv>
        </Switch>
    )
}

export default AnimatedWrapper

const afterBorderColor = keyframes`
    to {
        border-bottom-color: #60d75a;
        border-left-color: #60d75a;
    }
`

const moveAround = keyframes`
    0% {
        top: 0;
        left: 0;
    }
    25% {
        top: 0;
        left: 100%;
    }
    50% {
        top: 100%;
        left: 100%;
    }
    75% {
        top: 100%;
        left: 0;
    }
    100% {
        top: 0;
        left: 0;
    }
`

const moveDown = keyframes`
    to {top: 99%;}
`

const fade = keyframes`
    to {
        box-shadow: 0 0 0 0;
        border: 0;
    }
`

const showShadow = keyframes`
    25% {box-shadow: 0 -5px 10px #60d75a;}
    50% {box-shadow: 5px -5px 10px #60d75a;}
    75% {box-shadow: 5px 0 10px #60d75a;}
    100% {box-shadow: 0 0 10px #60d75a;}
`

const glowEffect = keyframes`
    0% {box-shadow: 0 0 10px #60d75a;}
    50% {box-shadow: 0 0 5px #60d75a;}
    100% {box-shadow: 0 0 10px #60d75a;}
`

const shadows = css`
    animation: ${showShadow} 1s ease-out forwards,
        ${glowEffect} 3s linear 1s forwards infinite;
`

const animateLeft = css`
    right: 0;

    ::before {
        right: 0;
        border-left: 1px solid #60d75a;
    }

    ::after {
        right: 0;
    }
`

const LightEffect = styled.div`
    position: absolute;
    height: 2px;
    width: 2px;
    border: 1px solid #60d75a;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px #60d75a,
        0 0 5px 2px #60d75a inset,
        -5px 0px 23px 5px #60d75a;
    ${props => props.absolute && "top: 0;"}
    ${props => props.right
        ? css`right: ${props.hideOffset};`
        : css`left: ${props.hideOffset}`
    }
    animation: ${props=> props.absolute 
        ? css`${moveDown} 1s ease-out forwards,
            ${fade} .25s ease-out 1s forwards;`
        : css`${moveAround} 1s ease-out forwards,
            ${fade} .25s ease-out 1s forwards;`}
`

const WrapperForRight = styled.div`
    position: absolute;
    right: 0;
    width: ${props => props.width};
    height: 100%;
    overflow: hidden;
`

const AbsoluteAnimatedDiv = styled.div`
    height: 100%;
    width: ${props => props.width};
    ${props => props.left && animateLeft}
    z-index: 1;
    transition: margin 1s ease-in-out;

    :hover::after {
        box-shadow: 0 0 15px #60d75a;
    }

    ::before {
        background-color: rgba(0,0,0,0.85);
        ${props => props.right 
            && "border-right: 1px solid #60d75a;"}
        animation: ${expandHeight} 1s ease-out forwards,
            ${showShadow} .25s ease-out 1s forwards,
            ${glowEffect} 3s linear 1.25s forwards infinite;
    }

    ::after {
        top: 0;
        height: 100%;
        transition: box-shadow .25s ease-out;
    }

    ::before, ::after {
        content: '';
        width: 100%;
        z-index: -1;
        ${props => props.right 
            ? css`right: ${props.hideOffset};` 
            : css`left: ${props.hideOffset};`
        }
    }

    &, ::before, ::after {
        position: absolute;
    }
`

const AllbordersAnimatedDiv = styled.div`
    position: relative;
    ${props => props.shadows && shadows}

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
        border-top-color: #60d75a;
        border-right-color: #60d75a;
        animation:${expandWidth} .25s ease-out forwards,
            ${expandHeight} .25s ease-out .25s forwards;
    }

    ::after {
        right: 0;
        bottom: 0;
        animation: ${afterBorderColor} 0s ease-out .5s forwards,
            ${expandWidth} .25s ease-out .5s forwards,
            ${expandHeight} .25s ease-out .75s forwards;
    }
`
