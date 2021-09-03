import {connect, styled, css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const SearchBar = ({actions}) => {
    let inputState = {value: ''}
    
    return (
        <>
            <AnimatedWrapper css={css`
                ${wrapperStyles}
                padding-left: 1px;
            `}>
                <Input 
                    type="text" 
                    onChange={event => inputState = {value: event.target.value}} 
                    placeholder="Search blog posts."
                />
            </AnimatedWrapper>
            <AnimatedWrapper shadows css={css`
                ${wrapperStyles}
                margin: auto;
            `}>
                <Button onClick={() => actions.router.set("/?s="+inputState.value)}>
                    <AnimatedText text="Search" comp="p"/>
                </Button>
            </AnimatedWrapper>
        </>
    )
}

export default connect(SearchBar);

const wrapperStyles = css`
    z-index: 1;
    width: fit-content;
`

const common = css`
    position: relative;
    display: block;
    background-color: transparent;
    border: 0;
    color: #60d75a;
    z-index: 2;
    font-family: 'Share Tech Mono';
`

const Input = styled.input`
    ${common}
    margin-bottom: 1em;
    padding: 2px 1px;
    animation: ${expandWidth()} 1s ease-out forwards;

    :focus {
        outline: none;
        box-shadow: 0 0 10px #60d75a;
    }

    ::placeholder {
        color: #628a6c;
    }
`

const Button = styled.button`
    ${common}
    cursor: pointer;
    padding: 4px;
    transition: background-color .25s ease-out,
        color .25s ease-out;

    :hover {
        background-color: #60d75a;
        color: black;
        border-radius: 3px;
    }
`