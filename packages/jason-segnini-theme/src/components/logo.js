import {styled, css} from "frontity"
import {glowForText, glowForPolygon} from "../styles/keyframes"
import AnimatedText from "./animated-text"

const Logo = () => (
    <svg width="143" height="143">
        <Line x1="60%" y1="50%" x2="100%" y2="100%"/>
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
    </svg>
)

export default Logo

const textStyles = css`
    fill: #60d75a;
    font-family: 'Share Tech Mono';
    text-align: center;
    font-size: 30px;
    animation: 
        ${glowForText} 3s ease-out alternate infinite;
`

const Line = styled.line`
    stroke-width: 2;
    stroke: #60d75a;
    animation: 
        ${glowForPolygon()} 3s ease-out alternate infinite;
`