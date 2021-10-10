import { connect, styled } from "frontity"
import { useRef, useEffect } from "react"

const Background = ({state}) => {
    const canvas = useRef(null)
    const FRAME_PERIOD = 50
    let lastTime = 0

    const drawMatrix = (canvas) => {
        const ctx = canvas.getContext('2d')

        const w = canvas.width = document.body.offsetWidth
        const h = canvas.height = document.body.offsetHeight
        
        const cols = Math.floor(w / 20) + 1
        const ypos = Array(cols).fill(0)
        
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, w, h)
        
        const matrix = time => {
            if ((time - lastTime) < FRAME_PERIOD) {
                return requestAnimationFrame(matrix)
            }

            lastTime = time
            const data = state.source.get(state.router.link)
            ctx.fillStyle = '#0001'
            ctx.fillRect(0, 0, w, h)
        
            ctx.fillStyle = data.isError ? '#ff0000' : '#0f0'
            ctx.font = '15pt Share Tech Mono'
        
            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128)
                const x = ind * 20
                ctx.fillText(text, x, y)
    
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0
                    else ypos[ind] = y + 20
            })
            requestAnimationFrame(matrix)
        }

        requestAnimationFrame(matrix)
    }

    useEffect(() => drawMatrix(canvas.current), [])
    return <Canvas ref={canvas}/>
}

export default connect(Background)

const Canvas = styled.canvas`
  position: fixed;
  z-index: -1;
`