import {useState} from "react"
import {css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import Link from "@frontity/components/link"

const AnimatedText = ({
    'data-timeout': timeout = 0, 
    'data-speed': speed = 30,
    'data-cover-text': isCoverText,
    comp,
    text,
    ...rest
}) => {
    const [textContent, setTextContent] = useState({
        content: '',
        animationFinished: false
    });

    const writeText = () => {
        let i = 0
        const baseSpeed = speed
        const fPauseSpeed = baseSpeed*10
        const sPauseSpeed = baseSpeed*20
    
        const typeWriter = () => {
            if (isCoverText && (speed === fPauseSpeed || speed === sPauseSpeed)) 
                speed = baseSpeed
    
            if (i < text.length) {    
                let char = text.charAt(i)

                if (isCoverText && char === '.') 
                    speed = Math.random() < 0.5 ? fPauseSpeed : sPauseSpeed

                setTextContent(textContent => ({
                    ...textContent, content: textContent.content + char
                }))
                i++
                setTimeout(typeWriter, speed)
                return
            }
            
            setTextContent(textContent => ({...textContent, animationFinished: true}))
        }

        typeWriter()
    }

    const writeTextForLink = css`
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        animation: ${expandWidth} ${(2000*speed)/30}ms ease-out ${timeout}ms forwards;
    `
    if (comp != 'a' && textContent.content === '') setTimeout(writeText, timeout)
    if (textContent.animationFinished && textContent.content != text) 
        setTextContent(textContent => ({...textContent, content: text}))

    switch(comp) {
        case 'h1':
            return <h1 {...rest}>{textContent.content}</h1>
    
        case 'h2':
            return <h2 {...rest}>{textContent.content}</h2>
    
        case 'h3':
            return <h3 {...rest}>{textContent.content}</h3>
    
        case 'h4':
            return <h4 {...rest}>{textContent.content}</h4>
    
        case 'h5':
            return <h5 {...rest}>{textContent.content}</h5>
    
        case 'h6':
            return <h6 {...rest}>{textContent.content}</h6>
    
        case 'p':
            return <p {...rest}>{textContent.content}</p>
    
        case 'a':
            return <Link css={css`${writeTextForLink}`} {...rest}>{text}</Link>

        case 'summary':
            return <summary {...rest}>{textContent.content}</summary>
    
        default:
            return <div {...rest}>{textContent.content}</div>
    }
}

export default AnimatedText