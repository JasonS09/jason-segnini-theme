import { connect, styled, css } from "frontity"
import AnimatedText from "./animated-text"
import Lobo from "./lobo"

const Loading = ({state, text='Loading...'}) => (
    <Container>
        <Lobo/>
        <AnimatedText 
            comp='h1' 
            text={text}
            css={textStyles(state.theme.color)}    
        />
    </Container>
)

export default connect(Loading)

const textStyles = color => css`
    font-family: 'Hacked';
    text-shadow: 0 0 3px ${color};
`

const Container = styled.div`text-align: center;`