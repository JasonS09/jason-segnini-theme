import {styled, keyframes, css} from "frontity"
import {expandWidth, expandHeight, glow, setBackgroundColor} from "../styles/keyframes"
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

    const fHideOffset = formatSizeProp(hideOffset)
    width = formatSizeProp(width)
    
    return (
        <Switch>
            <AbsoluteAnimatedDiv
                when={absolute && right}
                right
                width={width}
                hideOffset={fHideOffset}
                {...rest}
            >
                <TopBorder right/>
                <CuteCircle/>
                <StyledCorner hideOffset={fHideOffset}/>
                <BottomBorder hideOffset={fHideOffset}/>
                <LightEffect 
                    absolute
                    right 
                    hideOffset={hideOffset}                        
                />
                <LightEffect 
                    absolute
                    right 
                    hideOffset={hideOffset}
                    css={css`
                        top: auto;
                        bottom: 5%;
                        right: 21%;
                        border: none;
                        box-shadow: none;
                        animation: 
                            ${makeAppear} .10s ease-out .75s forwards,
                            ${showShadow(10, 2, 4)} .10s ease-out .75s forwards,
                            ${moveDownForRightAlt} .25s ease-out .75s forwards,
                            ${fade} .10s ease-out 1s forwards;
                    `}                        
                />
                {rest.children}
            </AbsoluteAnimatedDiv>
            <WrapperForRight 
                when={absolute} 
                width={width}
            >
                <AbsoluteAnimatedDiv 
                    width={width}
                    hideOffset={fHideOffset}
                    {...rest}
                >
                    <TopBorder/>
                    <LightEffect 
                        absolute
                        hideOffset={fHideOffset} 
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

const moveDownForLeft = keyframes`
    to {top: 99%;}
`

const moveDownForRight = keyframes`
    60% {
        top: 94%;
        right: 15.82%;
    }
    70% {
        top: 94.6%;
        right: 17.2%;
    }
    80% {
        top: 94.6%;
        right: 65%;
    }
    100% {
        top: 90%;
        right: 76%;
    }
`

const moveDownForRightAlt = keyframes`
    60% {
        bottom: 2%;
        right: 15.82%;
    }
    100% {
        bottom: 0;
        right: 15.82%;
    }
`

const fade = keyframes`
    to {
        box-shadow: 0 0 0 0;
        border: 0;
    }
`

const makeAppear = keyframes`
    from {border-width: 0}
    to {border-width: 1px}
`

const showShadow = (
    blur = 10, 
    fromSpread = 0, 
    toSpread = 0
) => keyframes`
    0% {box-shadow: 0 0 0 #60d75a;}
    50% {box-shadow: 0 0 ${blur}px ${fromSpread}px #60d75a;}
    100% {box-shadow: 0 0 5px ${toSpread}px #60d75a;}
`

const glowEffect = (spread = 0) => keyframes`
    from {box-shadow: 0 0 5px ${spread}px #60d75a;}
    to {box-shadow: 0 0 10px ${spread}px #60d75a;}
`

const animateLeft = (hideOffset) => css`
    ::before {
        height: 100%;
    }

    ::after {
        top: 9.5%;
        border-left: 1px solid #60d75a;
        animation: 
            ${expandHeight(91)} .95s ease-out .05s forwards;
    }

    ::before, ::after {
        left: ${hideOffset}
    }

    &, ::before, ::after {
        right: 0;
    }
`

const animateRight = (hideOffset) => css`
    ::before {
        height: 95%;
        clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 99%, 
            97% 100%, 
            0 100%
        );
    }

    ::after {
        top: 8.8%;
        border-right: 2px solid #60d75a;
        clip-path: polygon(
            0% 0%, 
            100% 0, 
            100% 
            93.3%, 
            96% 100%, 
            0 100%
        );
        animation: 
            ${expandHeight(91)} .55s ease-out .05s forwards;
    }

    ::before, ::after {
        right: ${hideOffset};
    }
`

const CuteCircle = styled.div`
    position: absolute;
    bottom: 10%;
    left: 21.5%;
    border: 0 solid #60d75a;
    border-radius: 50%;
    width: 3%;
    height: 1.2%;
    animation: ${makeAppear} .5s ease-out 1s forwards,
        ${showShadow(10, 3, 1)} .5s ease-out 1s 1 alternate,
        ${glowEffect(1)} 3s linear 1.5s infinite alternate;
`

const BottomBorder = styled.div`
    position: absolute;
    bottom: 0;
    height: 5%;
    width: 100%;
    right: ${props => props.hideOffset};
    background-color: rgba(0,0,0,.85);
    clip-path: polygon(
        0% 0%, 
        91% 0%, 
        100% 46%, 
        100% 100%, 
        0% 100%
    );

    ::before {
        content: '';
        position: absolute;
        width: 10%;
        height: 50%;
        top: 0;
        right: 0;
        clip-path: polygon(0% 0%, 100% 0, 100% 100%);
        z-index: 1;
        animation: 
            ${setBackgroundColor} .60s ease-out .75s forwards;
    }

    ::after {
        content: '';
        position: absolute;
        top: 0;
        width: 99.4%;
        border-right: 2px solid #60d75a;
        animation: 
            ${expandHeight()} .40s ease-out .75s forwards;
    }
`

const StyledCorner = styled.div`
    position: absolute;
    height: 5%;
    bottom: 5%;
    right: ${props => props.hideOffset};
    border-bottom: 1px solid #60d75a;
    clip-path: polygon(
        0% 0%, 
        100% 0%, 
        100% 80%, 
        95% 100%, 
        20% 100%, 
        0 5%
    );
    animation: 
        ${expandWidth(60)} .15s ease-out .65s forwards;

    ::before {
        right: 0;
        width: 5%;
        clip-path: polygon(100% 80%, 0 100%, 100% 100%);
        animation: 
            ${setBackgroundColor} .5s ease-out .60s forwards;
    }

    ::after {
        left: 0;
        width: 20%;
        clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
        animation: 
            ${setBackgroundColor} .20s ease-out .80s forwards;
    }

    ::before, ::after {
        content: '';
        position: absolute;
        height: 100%;
    }
`

const TopBorder = styled.div`
    position: absolute;
    width: 84.2%;
    top: 0;
    ${props => props.right
        ? css`
            border-right: 1px solid #60d75a;
            animation: 
                ${expandHeight(2.5)} .05s ease-out forwards;
        `
        : css`
            right: 0;
            border-left: 1px solid #60d75a;
            animation: 
                ${expandHeight(2.4)} .05s ease-out forwards;
        `
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
    ${props => (props.absolute && props.right)
        ? css`right: ${props.hideOffset}px;`
        : css`left: ${props.hideOffset}px`
    }
    animation: ${props=> props.absolute 
        ? (
            props.right
            ? css`
                ${moveDownForRight} 1s ease-out forwards,
                ${fade} .25s ease-out 1s forwards;
            `
            : css`
                ${moveDownForLeft} 1s ease-out forwards,
                ${fade} .25s ease-out 1s forwards;
            `
        )
        : css`
            ${moveAround} 1s ease-out forwards,
            ${fade} .25s ease-out 1s forwards;
        `
    }
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
    ${props => props.right 
        ? animateRight(props.hideOffset)
        : animateLeft(props.hideOffset)}
    z-index: 1;
    transition: margin 1s ease-in-out;

    ::before {
        background-color: rgba(0,0,0,.85);
    }

    ::before, ::after {
        content: '';
        width: 100%;
        z-index: -1;
    }

    &, ::before, ::after {
        position: absolute;
    }
`

const AllbordersAnimatedDiv = styled.div`
    position: relative;
    ${props => props.shadows 
        && css`
            animation: 
                ${showShadow()} .5s ease-out 1s forwards,
                ${glowEffect()} 3s linear 1.5s infinite alternate;
        `
    }

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
        animation: 
            ${expandWidth()} .25s ease-out forwards,
            ${expandHeight()} .25s ease-out .25s forwards;
    }

    ::after {
        right: 0;
        bottom: 0;
        animation: 
            ${afterBorderColor} 0s ease-out .5s forwards,
            ${expandWidth()} .25s ease-out .5s forwards,
            ${expandHeight()} .25s ease-out .75s forwards;
    }
`
