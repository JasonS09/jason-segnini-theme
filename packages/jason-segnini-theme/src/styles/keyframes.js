import { keyframes } from "frontity"

export const expandWidth = (width = 100) => keyframes`
    from {width: 0;}
    to {width: ${width}%;}
`

export const expandHeight = (height = '100%') => keyframes`
    from {height: 0;}
    to {height: ${height};}
`

export const glow = (
    color,
    fromBlur = 5, 
    toBlur = 10,
    fromSpread = 0,
    toSpread = 0
) => keyframes`
    from {box-shadow: 0 0 ${fromBlur}px ${fromSpread}px ${color};}
    to {box-shadow: 0 0 ${toBlur}px ${toSpread}px ${color};}
`

export const glowForPolygon = (
    color,
    from = 3, 
    to = 7, 
    fromOpacity = .85,
    toOpacity = .85
) => keyframes`
    from {
        filter: drop-shadow(0 0 ${from}px ${color}) 
            opacity(${fromOpacity})
    }
    to {
        filter: drop-shadow(0 0 ${to}px ${color}) 
            opacity(${toOpacity})
    }
`

export const glowForText = color => keyframes`
    from {text-shadow: 0 0 2px ${color}}
    to {text-shadow: 0 0 5px ${color}}
`

export const makeAppear = (opacity = 1) => keyframes`
    from {filter: opacity(0)}
    to {filter: opacity(${opacity})}
`

export const draw = keyframes`to {stroke-dashoffset: 0;}`