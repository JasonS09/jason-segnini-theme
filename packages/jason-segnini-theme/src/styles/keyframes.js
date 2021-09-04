import {keyframes} from "frontity"

export const expandWidth = (
    width = 100
) => keyframes`
    from {width: 0;}
    to {width: ${width}%;}
`

export const expandHeight = (
    height = 100
    ) => keyframes`
    from {height: 0;}
    to {height: ${height}%;}
`

export const glow = (from = 3, to = 7) => keyframes`
    from {filter: drop-shadow(0 0 ${from}px #60d75a) opacity(0.85)}
    to {filter: drop-shadow(0 0 ${to}px #60d75a) opacity(0.85)}
`

export const setBackgroundColor = keyframes`
    to {background-color: #60d75a;}
`