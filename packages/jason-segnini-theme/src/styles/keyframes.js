import {keyframes} from "frontity"

export const expandWidth = keyframes`
    from {width: 0;}
    to {width: 100%;}
`

export const expandHeight = (
    totalHeight = 100
    ) => keyframes`
    from {height: 0;}
    to {height: ${totalHeight}%;}
`

export const glow = keyframes`
    from {filter: drop-shadow(0 0 7px #60d75a)}
    to {filter: drop-shadow(0 0 3px #60d75a)}
`

export const setBackgroundColor = keyframes`
    to {background-color: #60d75a;}
`