import {createRef,useEffect} from "react"
import {css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import Link from "@frontity/components/link"

const AnimatedText = ({
    'data-timeout': timeout = 0, 
    'data-speed': speed = 30,
    'data-is-cover-text': isCoverText,
    comp,
    text,
    ...rest
}) => {
    const compRef = createRef()

    const writeText = (textComponent, txt) => {
        let i = 0
        const baseSpeed = speed
        const fPauseSpeed = baseSpeed*10
        const sPauseSpeed = baseSpeed*20
        textComponent.style.display = 'inline-block'
    
        const typeWriter = () => {
            if (isCoverText && (speed === fPauseSpeed || speed === sPauseSpeed)) 
                speed = baseSpeed
    
            if (i < txt.length) {    
                let char = txt.charAt(i)
                if (isCoverText && char === '.') 
                    speed = Math.random() < 0.5 ? fPauseSpeed : sPauseSpeed
    
                textComponent.textContent += char
                i++
                setTimeout(typeWriter, speed)
            }
        }
        typeWriter()
    }

    useEffect(() => {
        if (comp != 'a')
            setTimeout(writeText, timeout, compRef.current, text)
    })

    switch(comp) {
        case 'h1':
            return <h1 ref={compRef} {...rest}></h1>
    
        case 'h2':
            return <h2 ref={compRef} {...rest}></h2>
    
        case 'h3':
            return <h3 ref={compRef} {...rest}></h3>
    
        case 'h4':
            return <h4 ref={compRef} {...rest}></h4>
    
        case 'h5':
            return <h5 ref={compRef} {...rest}></h5>
    
        case 'h6':
            return <h6 ref={compRef} {...rest}></h6>
    
        case 'p':
            return <p ref={compRef} {...rest}></p>
    
        case 'a':
            return <Link css={css`
                        width: 0;
                        overflow: hidden;
                        white-space: nowrap;
                        animation: ${expandWidth} 2s ease-out ${timeout}ms forwards
                    `} {...rest}>{text}</Link>

        case 'summary':
            return <summary ref={compRef} {...rest}></summary>
    
        default:
            return <div ref={compRef} {...rest}></div>
    }
}

export default AnimatedText