import {connect, styled, css} from "frontity"
import {glowForText, glowForPolygon, draw} from "../styles/keyframes"
import {useRef, useState, useEffect} from "react"
import AnimatedText from "./animated-text"
import Lobo from "./lobo"

const Logo = ({state}) => {
    const data = state.source.get(state.router.link)
    const glowColor = state.theme.color
    const strokeColor = data.isError ? '#ff7878' : '#7eff78'
    const [sizes, setSizes] = useState([])
    const figs = useRef([])

    const getTotalLenghtForLine = (x1, y1, x2, y2) => 
        Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))

    const getTotalLenghtForCircle = r => 2*Math.PI*r

    useEffect(() => {
        const sizes = []

        figs.current.forEach(fig => {
            if (fig.tagName.toLowerCase() === 'circle')
                sizes.push(
                    getTotalLenghtForCircle(fig.r.baseVal.value)
                )
            else
                sizes.push(getTotalLenghtForLine(
                    fig.x1.baseVal.value,
                    fig.y1.baseVal.value,
                    fig.x2.baseVal.value,
                    fig.y2.baseVal.value
                ))
        })

        setSizes(sizes)
    }, [])

    return (
            <Div>
                <Lobo css={loboStyles(glowColor)}/>
                <Svg width="143" height="173">
                    <Line 
                        x1="98%" 
                        y1="83%" 
                        x2="50%" 
                        y2="0"
                        delay=".25"
                        size={sizes[1]}
                        strokeColor={strokeColor}
                        glowColor={glowColor}
                        ref={fig => figs.current[1] = fig} 
                    />
                    <AnimatedText 
                        comp="text" 
                        text="Jason E." 
                        x="0" 
                        y="30%"
                        textLength="143"
                        lengthAdjust="spacing"
                        css={textStyles(glowColor)}/>
                    <AnimatedText 
                        comp="text" 
                        text="Segnini" 
                        x="0" 
                        y="50%"
                        textLength="143"
                        lengthAdjust="spacing"
                        css={textStyles(glowColor)}
                    />
                    <AnimatedText 
                        comp="text" 
                        text="Cubero" 
                        x="0" 
                        y="70%"
                        textLength="143"
                        lengthAdjust="spacing"
                        css={textStyles(glowColor)}
                    />
                    <Line 
                        x1="45%" 
                        y1="70%" 
                        x2="98%" 
                        y2="83%"
                        size={sizes[0]}
                        strokeColor={strokeColor}
                        glowColor={glowColor}
                        ref={fig => figs.current[0] = fig}
                    />
                    <Line 
                        x1="50%" 
                        y1="0" 
                        x2="5%" 
                        y2="78%"
                        delay=".50"
                        size={sizes[2]}
                        strokeColor={strokeColor}
                        glowColor={glowColor}
                        ref={fig => figs.current[2] = fig} 
                    />
                    <Circle 
                        cx="5%" 
                        cy="78%" 
                        r="3%"  
                        delay=".75" 
                        size={sizes[3]}
                        strokeColor={strokeColor}
                        glowColor={glowColor}
                        ref={fig => figs.current[3] = fig}
                    />
                    <Ellipse 
                        cx="50%" 
                        cy="95%" 
                        rx="50%" 
                        ry="3%"
                        color={glowColor}
                    />
                </Svg>
            </Div>
        )
    }

export default connect(Logo)

const textStyles = (color) => css`
    fill: ${color};
    font-family: 'Hacked';
    font-size: 25px;
    user-select: none;
    animation: 
        ${glowForText(
            color
        )} 3s ease-out alternate infinite;
`

const Svg = styled.svg`
    filter: opacity(1);
    transition: filter 1s ease-out;
`

const loboStyles = (color) => css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 1;
    filter: opacity(0);
    transition: filter 1s ease-out;

    path {
        animation: 
            ${glowForPolygon(
                color, 3, 7, 1, 1
            )} 3s ease-out alternate infinite;
    }

    :hover {
        filter: opacity(1);
        
        path {
            animation:
                ${draw} 10s ease-out forwards,
                ${glowForPolygon(
                    color, 3, 7, 1, 1
                )} 3s ease-out alternate infinite;
        }

        + ${Svg} {
            filter: opacity(0);

            line, circle, text {
                animation: 
                    ${glowForPolygon(
                        color, 3, 7, 1, 1
                    )} 3s ease-out alternate infinite;
            }
        }
    }
`

const common = (
    size = 0, 
    delay = 0,
    strokeColor,
    glowColor
) => css`
    stroke-width: 2;
    stroke: ${strokeColor};
    stroke-dasharray: ${size}px;
    stroke-dashoffset: ${size}px;
    stroke-linecap: round;
    animation:
        ${glowForPolygon(
            glowColor, 7, 14, 1, 1
        )} 3s ease-out ${delay}s alternate infinite,
        ${draw} .25s ease-out ${delay}s forwards;
`

const Div = styled.div`
    position: relative;
`

const Line = styled.line`
    ${props => common(
        props.size, 
        props.delay, 
        props.strokeColor,
        props.glowColor
    )}
`

const Circle = styled.circle`
    ${props => common(
        props.size, 
        props.delay, 
        props.strokeColor,
        props.glowColor
    )}
`

const Ellipse = styled.ellipse`
    fill: ${props => props.color};
    filter: blur(5px) opacity(.5);
`