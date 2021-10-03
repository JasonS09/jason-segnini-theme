import { connect, styled } from "frontity"
import AnimatedWrapper from "./common/animated-wrapper"
import Lobo from "./common/lobo"

const Error = ({state}) => {
    const color = state.theme.color

    return (
        <AnimatedWrapper type='polygonal'>
            <Content>
                <H1 color={color}>Error!</H1>
                <Lobo/>
                <p>
                    An error has ocurred and the path 
                    <em> {state.router.link} </em>  
                    cannot be displayed.
                </p>
            </Content>
        </AnimatedWrapper>
    )
}

export default connect(Error)

const H1 = styled.h1`font-family: 'Hacked';`

const Content = styled.div`
    text-align: center;
    padding: 1em;
`