import { useState, useEffect, useRef } from "react"
import { connect } from "frontity"
import Link from "@frontity/components/link"
import Switch from "@frontity/components/switch"

const AnimatedText = ({
    state,
    actions,
    'data-speed': speed = 20,
    'data-is-cover-text': isCoverText,
    comp,
    text = '',
    reanimate,
    onAnimationFinished,
    ...rest
}) => {
    const data = state.source.get(state.router.link)
    const isWelcomeReceived = state.theme.isWelcomeReceived
    const [states, setStates] = useState({
        content: text.charAt(0),
        i: 1
    })
    const animationSpeed = useRef(speed)

    const writeText = () => {
        const char = text.charAt(states.i)
        animationSpeed.current = speed
    
        if (isCoverText && text.charAt(states?.i-1) === '.') 
            animationSpeed.current = Math.random() < 0.5 ? speed*10 : speed*20
    
        const timeout = setTimeout(
            setStates,
            animationSpeed.current,
            states => ({
                content: states.content + char,
                i: states.i + 1
            })
        )

        return timeout
    }

    useEffect(() => {
        if (states.animationFinished) {
            if (states.content !== text) {
                setStates(
                    states => (
                        {...states, content: text}
                    )
                )   
            }
        }   

        if (isWelcomeReceived || data.isHome) {
            if (!states.animationFinished && text) {
                const timeout = writeText()
                return () => clearTimeout(timeout)
            }

            if (!isWelcomeReceived) 
                setTimeout(actions.theme.welcome, 1200)
        }
    }, [states, text])

    useEffect(() => {
        if (states.i === text.length)
            setStates(states => ({
                i: states.i,
                content: text,
                animationFinished: true
            }))
    }, [states.i])

    useEffect(() => {
        if (states.animationFinished && reanimate)
            setStates({
                content: text.charAt(0),
                i: 1
            })
    }, [reanimate])

    useEffect(() => {           
        if (states.animationFinished
            && typeof(onAnimationFinished) === 'function') 
            onAnimationFinished()
    }, [states.animationFinished])

    return (
        <Switch>
            <h1 when={comp==='h1'} {...rest}>
                {states.content}
            </h1>
            <h2 when={comp==='h2'} {...rest}>
                {states.content}
            </h2>
            <h3 when={comp==='h3'} {...rest}>
                {states.content}
            </h3>
            <h4 when={comp==='h4'} {...rest}>
                {states.content}
            </h4>
            <h5 when={comp==='h5'} {...rest}>
                {states.content}
            </h5>
            <h6 when={comp==='h6'} {...rest}>
                {states.content}
            </h6>
            <p when={comp==='p'} {...rest}>
                {states.content}
            </p>
            <strong when={comp==='strong'} {...rest}>
                {states.content}
            </strong>
            <Link when={comp==='a'} {...rest}>
                {states.content}
            </Link>
            <summary when={comp==='summary'} {...rest}>
                {states.content}
            </summary>
            <text when={comp==='text'} {...rest}>
                {states.content}
                {rest.children}
            </text>
            <tspan when={comp==='tspan'} {...rest}>
                {states.content}
            </tspan>
            <>{states.content}</>
        </Switch>
    )
}

export default connect(AnimatedText)