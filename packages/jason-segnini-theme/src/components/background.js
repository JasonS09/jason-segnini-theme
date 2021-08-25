import {connect, styled} from "frontity"
import {useRef, useEffect} from "react"

const Background = ({state, actions}) => {
    const matrixCanv = useRef(null)

    const drawMatrix = (canvas) => {
        const ctx = canvas.getContext('2d')

        const w = canvas.width = document.body.offsetWidth
        const h = canvas.height = document.body.offsetHeight
        
        const cols = Math.floor(w / 20) + 1
        const ypos = Array(cols).fill(0)
        
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, w, h)
        
        const matrix = () => {  
            ctx.fillStyle = '#0001'
            ctx.fillRect(0, 0, w, h)
        
            ctx.fillStyle = '#0f0'
            ctx.font = '15pt monospace'
        
            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128)
                const x = ind * 20
                ctx.fillText(text, x, y)
    
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0
                    else ypos[ind] = y + 20
            })
        }

        setInterval(matrix, 50)
    }

    useEffect(() => {
        if (!state.theme.backgroundLoaded) {
            setTimeout(drawMatrix, 2000, matrixCanv.current)
            actions.theme.loadBackground()
        }
    })

    return <Canvas ref={matrixCanv}></Canvas>
}

export default connect(Background)

const Canvas = styled.canvas`
  position: fixed;
  width: auto;
  height: auto;
  top: 0;
  left: 0;
  z-index: -1;
`