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
        randChar: '',
        i: 1,
        j: 0,
        animationFinished: false
    })
    const animationSpeed = useRef(speed)

    const writeText = () => {
        let timeout = 0
        const char = text.charAt(states.i)
        animationSpeed.current = speed
    
        if (isCoverText && text.charAt(states?.i-1) === '.') 
            animationSpeed.current = Math.random() < 0.5 ? speed*10 : speed*20
    
        timeout = setTimeout(
            setStates,
            animationSpeed.current,
            states => ({
                content: states.content + char,
                randChar: '',
                i: states.i + 1,
                j: 0
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
            if (!states.animationFinished) {
                let timeout = 0

                if (states.j < animationSpeed.current) {
                    timeout = setTimeout(
                        setStates,
                        speed,
                        states => ({
                            ...states, 
                            randChar: '',
                            j: animationSpeed.current
                        })
                    )
                }
                else if (text) timeout = writeText()

                return () => clearTimeout(timeout)
            }
            else if (states.randChar !== '')
                setStates(states => ({...states, randChar: ''}))

            if (!isWelcomeReceived) 
                setTimeout(actions.theme.welcome, 1200)
        }
    }, [states, text])

    useEffect(() => {
        if (states.i === text.length)
            setStates(states => ({
                ...states,
                content: text,
                animationFinished: true
            }))
    }, [states.i])

    useEffect(() => {
        if (states.animationFinished && reanimate)
            setStates({
                content: '',
                randChar: '',
                i: 0,
                j: 0,
                animationFinished: false
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
                {states.content + states.randChar}
            </h1>
            <h2 when={comp==='h2'} {...rest}>
                {states.content + states.randChar}
            </h2>
            <h3 when={comp==='h3'} {...rest}>
                {states.content + states.randChar}
            </h3>
            <h4 when={comp==='h4'} {...rest}>
                {states.content + states.randChar}
            </h4>
            <h5 when={comp==='h5'} {...rest}>
                {states.content + states.randChar}
            </h5>
            <h6 when={comp==='h6'} {...rest}>
                {states.content + states.randChar}
            </h6>
            <p when={comp==='p'} {...rest}>
                {states.content + states.randChar}
            </p>
            <strong when={comp==='strong'} {...rest}>
                {states.content + states.randChar}
            </strong>
            <Link when={comp==='a'} {...rest}>
                {states.content + states.randChar}
            </Link>
            <summary when={comp==='summary'} {...rest}>
                {states.content + states.randChar}
            </summary>
            <text when={comp==='text'} {...rest}>
                {states.content + states.randChar}
                {rest.children}
            </text>
            <tspan when={comp==='tspan'} {...rest}>
                {states.content + states.randChar}
            </tspan>
            <>{states.content + states.randChar}</>
        </Switch>
    )
}

export default connect(AnimatedText)