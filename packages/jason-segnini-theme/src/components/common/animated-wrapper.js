import { connect, styled, keyframes, css } from "frontity"
import { useRef, useEffect, useState } from "react"
import {
    expandWidth, 
    expandHeight, 
    glow, 
    makeAppear,
    glowForPolygon
} from "../../styles/keyframes"

const AnimatedWrapper = ({
    state,
    width = 0,
    hideOffset = 0,
    color = state.theme.color,
    type,
    right,
    isComponentHidden,
    ...rest
}) => {
    const data = state.source.get(state.router.link)
    const [states, setStates] = useState({})
    const ref = useRef(null)
    let timeout = 0

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
        if (states.reanimate)
            timeout = setTimeout(() => 
                setStates(states => ({
                    ...states,
                    reanimate: false
                })), 
                1000
            )
    }, [states.reanimate])

    useEffect(() => {
        setStates({
            reanimate: true,
            width: ref.current.clientWidth,
            height: ref.current.clientHeight
        })
        return () => clearTimeout(timeout)
    }, [data.isError])

    switch(type) {
        case 'absolute':
            if (right)
                return (
                    <AbsoluteAnimatedDiv
                        right
                        width={width}
                        hideOffset={hideOffset}
                        color={color}
                        isComponentHidden={isComponentHidden}
                        isMobile={state.screen.isMobile}
                        ref={ref}
                        {...rest}
                    >
                        <ShadowForRight 
                            hideOffset={hideOffset}
                            color={color}
                        />
                        <CuteCircle color={color}/>
                        <StyledCorner 
                            hideOffset={hideOffset}
                            color={color} 
                        />
                        <BottomBorderForRight 
                            hideOffset={hideOffset}
                            color={color} 
                        />
                        <LightEffect 
                            absolute
                            right
                            reanimate={states.reanimate} 
                            width={states.width}
                            height={states.height}
                            hideOffset={hideOffset}
                            color={color}
                        />
                        <LightEffect 
                            absolute
                            right 
                            hideOffset={hideOffset}
                            color={color}
                            css={css`
                                top: auto;
                                bottom: 5%;
                                right: 21%;
                                border: none;
                                box-shadow: none;
                                ${states.reanimate 
                                    && css`
                                        filter: opacity(1);
                                        animation: 
                                            ${makeAppear()} .10s ease-out .75s forwards,
                                            ${glow(
                                                color, 0, 10, 0, 4
                                            )} .10s ease-out .75s forwards,
                                            ${moveDownForRightAlt(
                                                states.width, states.height
                                            )} .25s ease-out .75s forwards;
                                    `
                                }
                            `}                        
                        />
                        {rest.children}
                    </AbsoluteAnimatedDiv>
                )
            return (
                <WrapperForLeft  
                    width={width}
                    ref={ref}
                >
                    <AbsoluteAnimatedDiv 
                        width={width}
                        hideOffset={hideOffset}
                        color={color}
                        isComponentHidden={isComponentHidden}
                        {...rest}
                    >
                        <ShadowForLeft 
                            hideOffset={hideOffset} 
                            color={color}   
                        />
                        <ButtonBackground color={color}/>
                        <BottomBorderForLeft 
                            hideOffset={hideOffset}
                            color={color} 
                        />
                        <LightEffect 
                            absolute
                            reanimate={states.reanimate}
                            width={states.width}
                            height={states.height}
                            hideOffset={hideOffset}
                            color={color}
                        />
                        {rest.children}
                    </AbsoluteAnimatedDiv>
                </WrapperForLeft>
            )

        case 'polygonal':
            return (
                <PolygonalAnimatedDiv color={color} ref={ref} {...rest}>
                    <ShadowForPolygon color={color}/>
                    <AllbordersAnimatedDiv 
                        color={color} 
                        css={css`
                            clip-path: polygon(
                                0% 0%, 
                                95.3% 0, 
                                100% 48px, 
                                100% 100%, 
                                0 100%
                            );
                            ::before, ::after {transition: border-width 0s .25s;}
                        `}
                    >
                        <StyledBorder color={color}/>
                        <LightEffect 
                            reanimate={states.reanimate}
                            width={states.width} 
                            height={states.height} 
                            color={color} 
                        />
                        {rest.children}
                    </AllbordersAnimatedDiv>
                </PolygonalAnimatedDiv>
            )

        default:
            return (
                <AllbordersAnimatedDiv 
                    color={color} 
                    ref={ref} 
                    {...rest}
                >
                    <LightEffect 
                        reanimate={states.reanimate} 
                        width={states.width} 
                        height={states.height} 
                        color={color} 
                    />
                    {rest.children}
                </AllbordersAnimatedDiv>
            )
    }
}

export default connect(AnimatedWrapper)

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

const animateLeft = (
    hideOffset, 
    isComponentHidden, 
    color
) => css`
    ${isComponentHidden 
        && css`margin-right: -250px`}
    right: 0;

    :hover {
        ${ShadowForLeft} {
            animation: 
                ${glowForPolygon(
                    color, 5, 9
                )} .25s ease-out forwards;
        }
    }

    ::before {
        border-left: 1px solid ${color};
        animation: 
            ${expandHeight('2.4%')} .05s ease-out forwards;
    }

    ::after {
        top: calc(2.4% + 53px);
        border-left: 1px solid ${color};
        clip-path: polygon(
            0 0, 
            100% 0, 
            100% 100%, 
            4.4% 100%, 
            0 96.5%
        );
        animation: 
            ${expandHeight(
                'calc(100% - 2.4% - 53px)'
            )} .95s ease-out .05s forwards;
    }

    ::before, ::after {left: ${hideOffset};}
`

const animateRight = (
    hideOffset, 
    isComponentHidden, 
    color,
    isMobile
) => css`
    ${isComponentHidden 
        && css`margin-left: -250px`}

    :hover {
        ${ShadowForRight} {
            animation: 
                ${glowForPolygon(
                    color, 5, 9
                )} .25s ease-out forwards;
        }
    }

    ::before {
        border-right: 1px solid ${color};
        animation: 
            ${expandHeight('2.5%')} .05s ease-out forwards;
    }

    ::after {
        top: calc(2.5% + 40px + 1%);
        border-right: ${isMobile
            ? 1
            : 2
        }px solid ${color};
        clip-path: polygon(
            0% 0%, 
            100% 0, 
            100% 93.1%, 
            96% 100%, 
            0 100%
        );
        animation: 
            ${expandHeight(
                'calc(100% - 2.5% - 40px - 1%)'
            )} .55s ease-out .05s forwards;
    }

    ::before, ::after {right: ${hideOffset};}
`

const StyledBorder = styled.div`
    position: absolute;
    width: 5%;
    height: 50px;
    right: 0;
    top: 0;
    background-color: ${props => props.color};
    clip-path: polygon(0% 0%, 100% 0, 100% 100%);
    filter: opacity(0);
    animation: 
        ${makeAppear()} .05s ease-out .20s forwards;
`

const ShadowForPolygon = styled.div`
    top: 0;
    animation: 
        ${props => css`
            ${glowForPolygon(
                props.color, 9, 3
            )} .25s ease-out 1,
            ${glowForPolygon(
                props.color
            )} 3s ease-out .25s alternate infinite;
        `};

    ::before {
        content: '';
        background-color: black;
        clip-path: polygon(
            0% 0%, 
            95.3% 0, 
            100% 48px, 
            100% 100%, 
            0 100%
        );
    }

    &, ::before {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`

const ShadowForLeft = styled.div`
    ${props => css`
        left: ${props.hideOffset};
        animation: ${glowForPolygon(
                props.color, 9, 3
            )} .25s ease-out forwards,
            ${glowForPolygon(
                props.color
            )} 3s ease-out .25s alternate infinite;
    `}

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
    animation: ${props => css`
        ${glowForPolygon(
            props.color, 9, 3
        )} .25s ease-out forwards,
        ${glowForPolygon(
            props.color
        )} 3s ease-out .25s alternate infinite;
    `};

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
        background-color: ${props => props.color};
        clip-path: polygon(0 100%, 50% 100%, 0 0);
        filter: opacity(0);
        animation: ${makeAppear()} .4s ease-out .96s forwards;
    }
`

const ButtonBackground = styled.div`
    position: absolute;
    width: 62px;
    height: 53px;
    top: 2.3%;
    left: 5.5%;
    border-radius: 50%;
    border: 2px solid ${props => props.color};
    clip-path: polygon(
        50% 0, 
        50% 100%, 
        100% 100%, 
        100% 0
    );
`

const CuteCircle = styled.div`
    position: absolute;
    width: 9px;
    height: 9px;
    bottom: 9.7%;
    left: 21.8%;
    border: 1px solid ${props => props.color};
    border-radius: 50%;
    filter: opacity(0);
    animation: ${props => css`
        ${makeAppear()} .5s ease-out 1s forwards,
        ${glow(
            props.color, 5, 10, 2, 1
        )} .25s ease-out 1.5s 2 alternate forwards,
        ${glow(
            props.color, 5, 10, 1, 1
        )} 3s linear 1.75s infinite alternate;
    `}
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
        width: 10%;
        height: 50%;
        right: 0;
        clip-path: polygon(0% 0%, 100% 0, 100% 100%);
        background-color: ${props => props.color};
        z-index: 1;
        filter: opacity(0);
        animation: 
            ${makeAppear()} .60s ease-out .75s forwards;
    }

    ::after {
        top: 0;
        width: 99.4%;
        border-right: 2px solid ${props => props.color};
        animation: 
            ${expandHeight()} .40s ease-out .75s forwards;
    }

    ::before, ::after {
        content: '';
        position: absolute;
    }
`

const StyledCorner = styled.div`
    position: absolute;
    height: 5%;
    bottom: 5%;
    right: ${props => props.hideOffset};
    border-bottom: 1px solid ${props => props.color};
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
        background-color: ${props => props.color};
        clip-path: polygon(100% 80%, 0 100%, 100% 100%);
        filter: opacity(0);
        animation: 
            ${makeAppear()} .5s ease-out .60s forwards;
    }

    ::after {
        left: 0;
        width: 20%;
        background-color: ${props => props.color};
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
    top: 0;
    height: 2px;
    width: 2px;
    border: 1px solid ${props => props.color};
    border-radius: 50%;
    ${props => !props.absolute && 'left: 0;'}
    ${props => css`
        box-shadow: 0 0 5px 2px ${props.color},
            0 0 5px 2px ${props.color} inset,
            0 0 23px 5px ${props.color};
    `}
    ${props => props.absolute && props.right
        ? css`right: ${props.hideOffset};`
        : css`left: ${props.hideOffset}`
    }
    transition: filter .10s ease-out;
    ${props => props.reanimate
        ? (
            props.absolute
                ? (
                    props.right
                        ? css`
                            filter: opacity(1);
                            animation: 
                                ${moveDownForRight(
                                    props.width,
                                    props.height
                                )} 1s ease-out forwards;
                            `
                        : css`
                            filter: opacity(1);
                            animation: 
                                ${moveDownForLeft(
                                    props.width,
                                    props.height
                                )} 1s ease-out forwards;
                        `
                ) 
                : css`
                    filter: opacity(1);
                    animation: 
                        ${moveAround(
                            props.width, 
                            props.height
                        )} 1s ease-out forwards;
                `
        )
        : css`filter: opacity(0)`
    }

`

const WrapperForLeft = styled.div`
    position: absolute;
    right: 0;
    width: ${props => props.width};
    height: 100vh;
    overflow: hidden;
`

const AbsoluteAnimatedDiv = styled.div`
    height: 100vh;
    width: ${props => props.width};
    ${props => props.right 
        ? animateRight(
            props.hideOffset, 
            props.isComponentHidden,
            props.color,
            props.isMobile
        )
        : animateLeft(
            props.hideOffset, 
            props.isComponentHidden,
            props.color
        )
    }
    z-index: 2;
    transition: margin 1s ease-in-out;
    ::before {z-index: 1;}

    ::before, ::after {
        content: '';
        width: 100%;
    }

    &, ::before, ::after {position: absolute;}
`

const AllbordersAnimatedDiv = styled.div`
    position: relative;
    ${props => props.shadows 
        && css`
            animation: 
                ${glow(
                    props.color, 5, 10
                )} .25s ease-out 1s 2 alternate forwards,
                ${glow(
                    props.color, 5, 10
                )} 3s linear 1.5s infinite alternate;
        `
    }

    ::before, ::after {
        content: '';
        box-sizing: inherit;
        position: absolute;
        border: 1px solid transparent;
        border-radius: 3px;
        z-index: -1;
    }

    ::before {
        top: 0;
        left: 0;
        ${props => css`
            border-top-color: ${props.color};
            border-right-color: ${props.color};
        `}
        animation: 
            ${expandWidth()} .25s ease-out forwards,
            ${expandHeight()} .25s ease-out .25s forwards;
    }

    ::after {
        right: 0;
        bottom: 0;
        ${props => css`
            border-left-color: ${props.color};
            border-bottom-color: ${props.color};
        `}
        filter: opacity(0);
        animation: 
            ${makeAppear()} 0s ease-out .5s forwards,
            ${expandWidth()} .25s ease-out .5s forwards,
            ${expandHeight()} .25s ease-out .75s forwards;
    }
`

const PolygonalAnimatedDiv = styled.div`
    position: relative;
    transition: transform .25s ease-out;

    :hover {
        transform: scale(1.01, 1.01);

        ${ShadowForPolygon} {
            animation: 
                ${props => 
                    glowForPolygon(props.color, 5, 9)
                } .25s ease-out forwards;
        }

        ${AllbordersAnimatedDiv} {
            ::before, ::after {
                border-width: 2px;
                transition: none;
            }
        }
    }
`