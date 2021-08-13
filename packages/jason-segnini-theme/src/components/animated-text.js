import {createRef,useEffect} from "react"
import Link from "@frontity/components/link"

const AnimatedText = (props) => {
    const compRef = createRef()

    const writeText = (textComponent, childText) => {
        let i = 0;
        const txt = childText;
        let speed = 50;
        textComponent.style.display = 'inline-block';
    
        const typeWriter = () => {
            if (speed === 1000 || speed === 500) speed = 50;
    
            if (i < txt.length) {    
                let char = txt.charAt(i)
                if (char === '.') speed = Math.random() < 0.5 ? 500 : 1000;
    
                textComponent.textContent += char;
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    const renderSwitch = (comp) => {
        switch(comp) {
            case 'h1':
                return <h1 {...props} ref={compRef}></h1>

            case 'h2':
                return <h2 {...props} ref={compRef}></h2>

            case 'h3':
                return <h3 {...props} ref={compRef}></h3>

            case 'h4':
                return <h4 {...props} ref={compRef}></h4>

            case 'h5':
                return <h5 {...props} ref={compRef}></h5>

            case 'h6':
                return <h6 {...props} ref={compRef}></h6>

            case 'p':
                return <p {...props} ref={compRef}></p>

            case 'a':
                return <Link {...props} ref={compRef}></Link>

            default:
                return <div {...props} ref={compRef}></div>
        }
    }

    useEffect(() => {
        setTimeout(writeText, 2000, compRef.current, props.text)
    })

    return(
        <>
            {renderSwitch(props.comp)}
        </>
    )
}

export default AnimatedText