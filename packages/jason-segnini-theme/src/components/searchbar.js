import {connect, styled, css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const SearchBar = ({actions}) => {
    let inputState = {value: ''}
    
    return (
        <>
            <AnimatedWrapper css={css`
                width: fit-content;
                padding-left: 1px;
            `}>
                <Input 
                    type="text" 
                    onChange={event => inputState = {value: event.target.value}} 
                    placeholder="Search blog posts."
                />
            </AnimatedWrapper>
            <AnimatedWrapper shadows css={css`
                width: fit-content;
                margin: auto;
            `}>
                <Button onClick={() => actions.router.set("/?s="+inputState.value)}>
                    <AnimatedText text="Search"/>
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
    z-index: 1;
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

    ::placeholder {color: #628a6c;}
`

const Button = styled.button`
    ${common}
    cursor: pointer;
    padding: 4px;
    transition: color .25s ease-out;

    :hover {
        color: black;
        border-radius: 3px;
        ::before, ::after {width: 50%;}
    }

    ::before {
        right: 50%;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    ::after {
        left: 50%;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    ::before, ::after {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        top: 0;
        background-color: #60d75a;
        z-index: -1;
        transition: width .25s ease-out;
    }
`