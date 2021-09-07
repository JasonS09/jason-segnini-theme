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

export const glow = (
    fromBlur = 5, 
    toBlur = 10,
    fromSpread = 0,
    toSpread = 0
) => keyframes`
    from {box-shadow: 0 0 ${fromBlur}px ${fromSpread}px #60d75a;}
    to {box-shadow: 0 0 ${toBlur}px ${toSpread}px #60d75a;}
`

export const glowForPolygon = (from = 3, to = 7) => keyframes`
    from {
        filter: drop-shadow(0 0 ${from}px #60d75a) 
            opacity(.85)
    }
    to {
        filter: drop-shadow(0 0 ${to}px #60d75a) 
            opacity(.85)
    }
`

export const makeAppear = (opacity = 1) => keyframes`
    from {filter: opacity(0)}
    to {filter: opacity(${opacity})}
`

export const fade = keyframes`
    to {filter: opacity(0);}
`