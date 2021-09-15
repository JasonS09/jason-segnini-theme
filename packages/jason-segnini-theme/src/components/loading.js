import {connect, styled, css} from "frontity"
import {glowForText} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import Lobo from "./lobo"

const Loading = ({state}) =>
    <Container>
        <Lobo css={css`margin: auto`}/>
        <AnimatedText 
            comp="h1" 
            text="Loading..." 
            css={textStyles(state.theme.color)}    
        />
    </Container>

export default connect(Loading)

const textStyles = (color) => css`
    font-family: 'Hacked';
    animation: 
        ${glowForText(
            color
        )} 3s ease-out infinite alternate;
`

const Container = styled.div`
    width: 50%;
    margin: auto;
    text-align: center;
`