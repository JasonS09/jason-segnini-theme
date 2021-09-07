import {css} from "frontity"
import {glowForText} from "../styles/keyframes"
import AnimatedText from "./animated-text"

const Logo = () => (
    <svg width="143" height="143">
        <AnimatedText 
            comp="text" 
            text="Jason E." 
            x="0" 
            y="30%"
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
                    y="70%"
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
    font-family: 'Orbitron';
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    animation: 
        ${glowForText} 3s ease-out alternate infinite;
`