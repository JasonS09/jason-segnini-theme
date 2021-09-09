import {styled, css, keyframes} from "frontity"
import {glowForText, glowForPolygon} from "../styles/keyframes"
import {useRef, useState, useEffect} from "react"
import AnimatedText from "./animated-text"

const Logo = () => {
    const [sizes, setSizes] = useState([])
    const figs = useRef([])

    const getTotalLenghtForLine = (x1, y1, x2, y2) => 
        Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))

    const getTotalLenghtForCircle = r => 2*Math.PI*r

    useEffect(() => {
        if (sizes.length === 0)
            figs.current.forEach(fig => {
                if (fig.tagName.toLowerCase() === 'circle')
                    setSizes(sizes => [...sizes, getTotalLenghtForCircle(
                        fig.r.baseVal.value
                    )])
                else
                    setSizes(sizes => [...sizes, getTotalLenghtForLine(
                        fig.x1.baseVal.value,
                        fig.y1.baseVal.value,
                        fig.x2.baseVal.value,
                        fig.y2.baseVal.value
                    )])
            })
    })

    return (
            <svg width="143" height="173">
                <Line 
                    x1="98%" 
                    y1="83%" 
                    x2="50%" 
                    y2="0"
                    delay=".25"
                    ref={fig => figs.current[1] = fig}
                    size={sizes[1]} 
                />
                <AnimatedText 
                    comp="text" 
                    text="Jason E." 
                    x="0" 
                    y="20%"
                    textLength="143"
                    lengthAdjust="spacing"
                    css={textStyles}>
                        <AnimatedText 
                            comp="tspan" 
                            text="Segnini" 
                            x="0" 
                            y="50%"
                            textLength="143"
                            lengthAdjust="spacing"
                            css={textStyles}
                        />
                        <AnimatedText 
                            comp="tspan" 
                            text="Cubero" 
                            x="0" 
                            y="80%"
                            textLength="143"
                            lengthAdjust="spacing"
                            css={textStyles}
                        />
                    </AnimatedText>
                    <Line 
                        x1="45%" 
                        y1="70%" 
                        x2="98%" 
                        y2="83%"
                        ref={fig => figs.current[0] = fig}
                        size={sizes[0]} 
                    />
                    <Line 
                        x1="50%" 
                        y1="0" 
                        x2="5%" 
                        y2="95%"
                        delay=".50"
                        ref={fig => figs.current[2] = fig}
                        size={sizes[2]} 
                    />
                    <Circle 
                        cx="5%" 
                        cy="95%" 
                        r="3%"  
                        delay=".75" 
                        ref={fig => figs.current[3] = fig}
                        size={sizes[3]}
                    />
            </svg>
        )
    }

export default Logo

const draw = keyframes`
    to {stroke-dashoffset: 0;}
`

const textStyles = css`
    fill: #60d75a;
    font-family: 'Share Tech Mono';
    text-align: center;
    font-size: 30px;
    user-select: none;
    animation: 
        ${glowForText} 3s ease-out alternate infinite;
`

const common = (size = 0, delay = 0) => css`
    stroke-width: 2;
    stroke: #69ff85;
    stroke-dasharray: ${size}px;
    stroke-dashoffset: ${size}px;
    stroke-linecap: round;
    animation:
        ${glowForPolygon(
            7, 14, 1,
        )} 3s ease-out ${delay}s alternate infinite,
        ${draw} .25s ease-out ${delay}s forwards;
`

const Line = styled.line`
    ${props => common(props.size, props.delay)}
`

const Circle = styled.circle`
    ${props => common(props.size, props.delay)}
`

const Ellipse = styled.ellipse`
    fill: #60d75a;
`