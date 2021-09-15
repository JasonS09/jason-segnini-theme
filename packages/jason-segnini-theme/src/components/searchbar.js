import {connect, styled, css} from "frontity"
import {expandWidth} from "../styles/keyframes"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"

const SearchBar = ({state, actions}) => {
    const data = state.source.get(state.router.link)
    const color = state.theme.color
    let inputState = {value: ''}
    
    return (
        <>
            <AnimatedWrapper css={css`padding-left: 1px;`}>
                <Input 
                    type='text'
                    placeholder='Search blog posts.'
                    color={color}
                    placeholderColor={data.isError ? '#8a6262' : '#628a6c'}
                    onChange={event => inputState = {value: event.target.value}}
                />
            </AnimatedWrapper>
            <AnimatedWrapper shadows css={css`
                width: fit-content;
                margin: auto;
            `}>
                <Button 
                    color={color}
                    onClick={() => actions.router.set('/?s='+inputState.value)}
                >
                    <AnimatedText text='Search'/>
                </Button>
            </AnimatedWrapper>
        </>
    )
}

export default connect(SearchBar);

const common = (color) => css`
    font-family: 'Share Tech Mono';
    color: ${color};
    position: relative;
    display: block;
    border: 0;
    background-color: transparent;
    z-index: 1;
`

const Input = styled.input`
    ${props => common(props.color)}
    margin-bottom: 1em;
    padding: 2px 1px;
    animation: ${expandWidth()} 1s ease-out forwards;

    :focus {
        outline: none;
        box-shadow: 0 0 10px ${props => props.color};
    }

    ::placeholder {color: ${props => props.placeholderColor}}
`

const Button = styled.button`
    ${props => common(props.color)}
    width: 51px;
    height: 23px;
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
        background-color: ${props => props.color};
        z-index: -1;
        transition: width .25s ease-out;
    }
`