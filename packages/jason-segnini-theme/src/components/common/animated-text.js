import {useState, useEffect, useLayoutEffect} from "react"
import {connect} from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"

const AnimatedText = ({
    state,
    actions,
    'data-speed': speed = 30,
    'data-cover-text': isCoverText,
    comp,
    text = '',
    reanimate,
    ...rest
}) => {
    const data = state.source.get(state.router.link)
    const isWelcomeReceived = state.theme.isWelcomeReceived
    const [textContent, setTextContent] = useState({
        content: '',
        randChar: '',
        i: 0,
        randTimer: 0,
        animationFinished: false
    });
    let timeout = 0

    const writeText = () => {
        let char = text.charAt(textContent.i)
    
        if (isCoverText && char === '.') 
            speed = Math.random() < 0.5 ? speed*10 : speed*20

        setTextContent(
            textContent => ({
                content: textContent.content + char,
                randChar: '',
                i: textContent.i + 1,
                randTimer: speed
            })
        )
    }

    useEffect(() => {
        if (textContent.i === text.length)
            setTextContent(textContent => ({
                ...textContent,
                animationFinished: true
            }))

        return () => clearTimeout(timeout)
    }, [textContent.i])

    useLayoutEffect(() => {
        if (textContent.animationFinished && reanimate)
            setTextContent({
                content: '',
                i: 0,
                randTimer: 0,
                animationFinished: false
            })
    }, [reanimate])

    if (textContent.animationFinished 
        && textContent.content != text) 
            setTextContent(
                textContent => (
                    {...textContent, content: text}
                )
            )
    
    else if (isWelcomeReceived || data.isHome) {
        if (!textContent.animationFinished) {
            if (textContent.randTimer > 0) {
                timeout = setTimeout(
                    setTextContent,
                    10,
                    textContent => ({
                        ...textContent, 
                        randChar: String.fromCharCode(
                            Math.random()*128,
                        ),
                        randTimer: textContent.randTimer-10
                    })
                )
            }
            else if (text) writeText()   
        }
        else if (textContent.randChar != '')
            setTextContent(textContent => ({...textContent, randChar: ''}))

        if (!isWelcomeReceived) 
            setTimeout(actions.theme.welcome, 1500)
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
            <p when={comp==='p'} {...rest}>
                {textContent.content + textContent.randChar}
            </p>
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
            <>{textContent.content + textContent.randChar}</>
        </Switch>
    )
}

export default connect(AnimatedText)