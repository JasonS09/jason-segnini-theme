import {useState} from "react"
import {connect} from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"

const AnimatedText = ({
    'data-speed': speed = 30,
    'data-cover-text': isCoverText,
    comp,
    text,
    reanimate,
    state,
    actions,
    ...rest
}) => {
    const data = state.source.get(state.router.link)
    const isWelcomeReceived = state.theme.isWelcomeReceived
    const [textContent, setTextContent] = useState({
        content: '',
        randChar: ''
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

            if (reanimate) 
                setTextContent(textContent => ({...textContent, reanimationFinished: true}))

            if (!isWelcomeReceived) setTimeout(actions.theme.welcome, 1500)
        }

        const randEffect = () => {
            if (i < text.length) {
                setTextContent(textContent => ({
                    ...textContent, 
                    randChar: String.fromCharCode(Math.random()*128)
                }))
                setTimeout(randEffect, 10)
                return
            }

            setTextContent(textContent => ({...textContent, randChar: ''}))
        }

        randEffect()
        setTimeout(typeWriter, speed)
    }
    
    if (textContent.content === '' 
        && textContent.randChar === ''
        && (isWelcomeReceived || data.isHome))
        writeText()

    if (textContent.animationFinished) {
        if (reanimate) {
            if (!textContent.reanimationFinished)
                setTextContent({
                    content: '',
                    randChar: ''
                })
        }
        else if (textContent.reanimationFinished)
            setTextContent(textContent => ({...textContent, reanimationFinished: false}))
        else if (textContent.content != text)
            setTextContent(textContent => ({...textContent, content: text}))
    }

    return (
        <Switch>
            <h1 when={comp==='h1'} {...rest}>
                {textContent.content + textContent.randChar}
            </h1>
            <h2 when={comp==='h2'} {...rest}>
                {textContent.content + textContent.randChar}
            </h2>
            <h3 when={comp==='h3'} {...rest}>
                {textContent.content + textContent.randChar}
            </h3>
            <h4 when={comp==='h4'} {...rest}>
                {textContent.content + textContent.randChar}
            </h4>
            <h5 when={comp==='h5'} {...rest}>
                {textContent.content + textContent.randChar}
            </h5>
            <h6 when={comp==='h6'} {...rest}>
                {textContent.content + textContent.randChar}
            </h6>
            <Link when={comp==='a'} {...rest}>
                {textContent.content + textContent.randChar}
            </Link>
            <summary when={comp==='summary'} {...rest}>
                {textContent.content + textContent.randChar}
            </summary>
            <text when={comp==='text'} {...rest}>
                {textContent.content + textContent.randChar}
                {rest.children}
            </text>
            <tspan when={comp==='tspan'} {...rest}>
                {textContent.content + textContent.randChar}
            </tspan>
            <p {...rest}>
                {textContent.content + textContent.randChar}
            </p>
        </Switch>
    )
}

export default connect(AnimatedText)