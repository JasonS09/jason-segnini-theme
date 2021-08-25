import {connect, styled, css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const SearchBar = ({state, actions}) => {
    const timeout = state.theme.startAnimationTimeout
    let inputState = {value: ''}
    
    return (
        <>
            <AnimatedWrapper timeout={timeout} css={css`
                                                        z-index: 1;
                                                        width: fit-content;
                                                    `}>
                <Input 
                    type="text" 
                    onChange={event => inputState = {value: event.target.value}} 
                    placeholder="Search blog posts."
                    css={css`animation: ${expandWidth} 1s ease-out ${timeout}ms forwards`}
                />
            </AnimatedWrapper>
            <AnimatedWrapper timeout={timeout} css={css`
                                                        z-index: 1;
                                                        width: fit-content;
                                                        margin: auto;
                                                    `}>
                <Button onClick={() => actions.router.set("/?s="+inputState.value)}>
                    <AnimatedText text="Search" comp="p" data-timeout={timeout}/>
                </Button>
            </AnimatedWrapper>
        </>
    )
}

export default connect(SearchBar);

const common = css`
    position: relative;
    display: block;
    background-color: transparent;
    border: 0;
    color: #60d75a;
    z-index: 2;
`

const Input = styled.input`
    ${common}
    margin-bottom: 1em;
    padding: 2px 1px;
    width: 0;

    :focus {
        outline: none;
    }
`

const Button = styled.button`
    ${common}
    cursor: pointer;
    padding: 4px;

    :hover {
        background-color: #60d75a;
        color: black;
    }
`