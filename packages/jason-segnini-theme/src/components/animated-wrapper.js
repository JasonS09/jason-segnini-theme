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
                right={right}
                width={formatSizeProp(width)}
                hideOffset={formatSizeProp(hideOffset)}
                {...rest}
            />
            <WrapperForRight 
                when={absolute} 
                width={formatSizeProp(width)}
            >
                <AbsoluteAnimatedDiv 
                    right={right}
                    width={formatSizeProp(width)}
                    hideOffset={formatSizeProp(hideOffset)}
                    {...rest}
                />
            </WrapperForRight>
            <AllbordersAnimatedDiv {...rest}>
                <LightEffectTop/>
                {rest.children}
            </AllbordersAnimatedDiv>
        </Switch>
    )
}

export default AnimatedWrapper

const bottomBorderColor = keyframes`
    to {border-bottom-color: #60d75a;}
`

const leftBorderColor = keyframes`
    to {border-left-color: #60d75a;}
`

const disappear = keyframes`
    to {
        height: 0;
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

const LightEffectTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #60d75a);
    animation: ${expandWidth} 2s ease-out forwards,
        ${disappear} 2s ease-out 2s forwards;
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

    ::before {
        content: '';
        width: 100%;
        background-color: rgba(0,0,0,0.85);
        z-index: -1;
        ${props => props.right && animateRight}
        ${props => props.right 
            ? css`right: ${props.hideOffset};` 
            : css`left: ${props.hideOffset};`
        }
        animation: ${expandHeight} 1s ease-out forwards;
    }

    &, ::before {
        position: absolute;
    }
`

const AllbordersAnimatedDiv = styled.div`
    position: relative;

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
        animation: ${bottomBorderColor} 0s ease-out .5s forwards,
            ${leftBorderColor} 0s ease-out .5s forwards,
            ${expandWidth} .25s ease-out .5s forwards,
            ${expandHeight} .25s ease-out .75s forwards;
    }
`
