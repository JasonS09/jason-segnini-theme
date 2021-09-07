
import {styled, keyframes, css} from "frontity"
import {useRef, useEffect, useState} from "react"
import {
    expandWidth, 
    expandHeight, 
    glow, 
    makeAppear,
    glowForPolygon,
    fade
} from "../styles/keyframes"

const AnimatedWrapper = ({
    width = 0,
    hideOffset = 0,
    absolute,
    right,
    isComponentHidden,
    ...rest
}) => {
    const [dimensions, setDimensions] = useState({})
    const ref = useRef(null)

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

    hideOffset = formatSizeProp(hideOffset)
    width = formatSizeProp(width)

    useEffect(() => {
        if (ref.current && Object.keys(dimensions).length === 0) 
            setDimensions({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight
            })
    })
    
    return (
        <>
            {absolute 
             ? right
                ? <AbsoluteAnimatedDiv
                    right
                    width={width}
                    hideOffset={hideOffset}
                    isComponentHidden={isComponentHidden}
                    ref={ref}
                    {...rest}
                >
                    <ShadowForRight hideOffset={hideOffset}/>
                    <CuteCircle/>
                    <StyledCorner hideOffset={hideOffset}/>
                    <BottomBorderForRight hideOffset={hideOffset}/>
                    <LightEffect 
                        absolute
                        right 
                        hideOffset={hideOffset}
                        width={dimensions.width}
                        height={dimensions.height}
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
                                ${makeAppear()} .10s ease-out .75s forwards,
                                ${glow(0, 10, 0, 4)} .10s ease-out .75s forwards,
                                ${moveDownForRightAlt(
                                    dimensions.width, dimensions.height
                                )} .25s ease-out .75s forwards,
                                ${fade} .10s ease-out 1s forwards;
                        `}                        
                    />
                    {rest.children}
                </AbsoluteAnimatedDiv>
                : <WrapperForLeft  
                    width={width}
                    ref={ref}
                >
                    <AbsoluteAnimatedDiv 
                        width={width}
                        hideOffset={hideOffset}
                        isComponentHidden={isComponentHidden}
                        {...rest}
                    >
                        <ShadowForLeft hideOffset={hideOffset}/>
                        <ButtonBackground/>
                        <BottomBorderForLeft hideOffset={hideOffset}/>
                        <LightEffect 
                            absolute
                            hideOffset={hideOffset}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                        {rest.children}
                    </AbsoluteAnimatedDiv>
                </WrapperForLeft>
            : <AllbordersAnimatedDiv ref={ref} {...rest}>
                <LightEffect 
                    width={dimensions.width} 
                    height={dimensions.height} 
                />
                {rest.children}
            </AllbordersAnimatedDiv>}
        </>
    )
}

export default AnimatedWrapper

const afterBorderColor = keyframes`
    to {
        border-bottom-color: #60d75a;
        border-left-color: #60d75a;
    }
`

const moveAround = (width, height) => keyframes`
    25% {transform: translateX(${width}px);}
    50% {transform: translate(${width}px, ${height}px);}
    75% {transform: translateY(${height}px);}
`

const moveDownForLeft = (width, height) => keyframes`
    96% {transform: translateY(${(96*height)/100}px);}
    100% {transform: translate(${(5*width)/100}px, ${height}px);}
`

const moveDownForRight = (width, height) => keyframes`
    60% {transform: translateY(${(94*height)/100}px);}
    70% {transform: translate(
            ${(-1.4*width)/100}px, 
            ${(94.6*height)/100}px
        );}
    80% {transform: translate(
            ${(-49.2*width)/100}px,
            ${(94.6*height)/100}px
        );}
    100% {transform: translate(
            ${(-60.2*width)/100}px,
            ${(90*height)/100}px
        );}
`

const moveDownForRightAlt = (width, height) => keyframes`
    60% {transform: translate(
            ${(5.18*width)/100}px,
            ${(3*height)/100}px
        );}
    100% {transform: translate(
            ${(5.18*width)/100}px, 
            ${(5*height)/100}px
        );}
`

const animateLeft = (hideOffset, isComponentHidden) => css`
    ${isComponentHidden 
        && css`margin-right: -250px`}
    right: 0;

    :hover {
        ${ShadowForLeft} {
            animation: 
                ${glowForPolygon(5, 9)} .25s ease-out forwards;
        }
    }

    ::before {
        border-left: 1px solid #60d75a;
        animation: 
            ${expandHeight(2.4)} .05s ease-out forwards;
    }

    ::after {
        top: 9.4%;
        border-left: 1px solid #60d75a;
        clip-path: polygon(
            0 0, 
            100% 0, 
            100% 100%, 
            4.4% 100%, 
            0 96%
        );
        animation: 
            ${expandHeight(91)} .95s ease-out .05s forwards;
    }

    ::before, ::after {
        left: ${hideOffset};
    }
`

const animateRight = (hideOffset, isComponentHidden) => css`
    ${isComponentHidden 
        && css`margin-left: -250px`}

    :hover {
        ${ShadowForRight} {
            animation: 
                ${glowForPolygon(5, 9)} .25s ease-out forwards;
        }
    }

    ::before {
        border-right: 1px solid #60d75a;
        animation: 
            ${expandHeight(2.5)} .05s ease-out forwards;
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

const ShadowForLeft = styled.div`
    left: ${props => props.hideOffset};
    animation: ${glowForPolygon(9, 3)} .25s ease-out 1,
        ${glowForPolygon()} 3s ease-out .25s alternate infinite;

    ::before {
        content: '';
        background-color: black;
        clip-path: polygon(
            0 0, 
            100% 0, 
            100% 100%, 
            4.4% 100%, 
            0 97%
        );
    }

    &, ::before {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`

const ShadowForRight = styled.div`
    height: 100%;
    animation: ${glowForPolygon(9, 3)} .25s ease-out 1,
        ${glowForPolygon()} 3s ease-out .25s alternate infinite;

    ::before {
        height: 95%;
        background-color: black;
        clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 99%, 
            97% 100%, 
            0 100%
        );
    }

    ::after {
        bottom: 0;
        height: 5%;
        background-color: black;
        clip-path: polygon(
            0% 0%, 
            91% 0%, 
            100% 46%, 
            100% 100%, 
            0% 100%
        );
    }

    ::before, ::after {
        content: '';
        right: ${props => props.hideOffset}
    }

    &, ::before, ::after {
        position: absolute;
        width: 100%;
    }
`

const BottomBorderForLeft = styled.div`
    position: absolute;
    width: 10%;
    height: 3.3%;
    bottom: 0;
    left: ${props => props.hideOffset};
    clip-path: polygon(
        0% 10%, 
        0 0, 
        100% 0, 
        100% 100%, 
        45% 100%
    );

    ::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #60d75a;
        clip-path: polygon(0 100%, 50% 100%, 0 0);
        filter: opacity(0);
        animation: ${makeAppear()} .4s ease-out .96s forwards;
    }
`

const ButtonBackground = styled.div`
    position: absolute;
    top: 2.3%;
    left: 5.5%;
    width: 21%;
    height: 7%;
    border-radius: 50%;
    border: 2px solid #60d75a;
    clip-path: polygon(
        50% 0, 
        50% 100%, 
        100% 100%, 
        100% 0
    );
`

const CuteCircle = styled.div`
    position: absolute;
    bottom: 10%;
    left: 21.5%;
    border: 1px solid #60d75a;
    border-radius: 50%;
    width: 3%;
    height: 1.2%;
    filter: opacity(0);
    animation: ${makeAppear()} .5s ease-out 1s forwards,
        ${glow(5, 10, 2, 1)} .25s ease-out 1.5s 2 alternate,
        ${glow(5, 10, 1, 1)} 3s linear 1.75s infinite alternate;
`

const BottomBorderForRight = styled.div`
    position: absolute;
    bottom: 0;
    height: 5%;
    width: 100%;
    right: ${props => props.hideOffset};
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
        background-color: #60d75a;
        z-index: 1;
        filter: opacity(0);
        animation: 
            ${makeAppear()} .60s ease-out .75s forwards;
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
        background-color: #60d75a;
        clip-path: polygon(100% 80%, 0 100%, 100% 100%);
        filter: opacity(0);
        animation: 
            ${makeAppear()} .5s ease-out .60s forwards;
    }

    ::after {
        left: 0;
        width: 20%;
        background-color: #60d75a;
        clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
        filter: opacity(0);
        animation: 
            ${makeAppear()} .20s ease-out .80s forwards;
    }

    ::before, ::after {
        content: '';
        position: absolute;
        height: 100%;
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
        ? css`right: ${props.hideOffset};`
        : css`left: ${props.hideOffset}`
    }
    animation: ${props=> props.absolute 
        ? (
            props.right
            ? css`
                ${moveDownForRight(
                    props.width,
                    props.height
                )} 1s ease-out forwards,
                ${fade} .25s ease-out 1s forwards;
            `
            : css`
                ${moveDownForLeft(
                    props.width,
                    props.height
                )} 1s ease-out forwards,
                ${fade} .25s ease-out 1s forwards;
            `
        )
        : css`
            ${moveAround(
                props.width, 
                props.height
            )} 1s ease-out forwards,
            ${fade} .25s ease-out 1s forwards;
        `
    }
`

const WrapperForLeft = styled.div`
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
        ? animateRight(
            props.hideOffset, 
            props.isComponentHidden
        )
        : animateLeft(
            props.hideOffset, 
            props.isComponentHidden
        )
    }
    transition: margin 1s ease-in-out;

    ::before, ::after {
        content: '';
        width: 100%;
        z-index: 1;
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
                ${glow(5, 10)} .25s ease-out 1s 2 alternate,
                ${glow(5, 10)} 3s linear 1.5s infinite alternate;
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