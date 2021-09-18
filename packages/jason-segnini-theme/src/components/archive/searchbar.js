import {connect, styled, css} from "frontity"
import {expandWidth} from "../../styles/keyframes"
import {center, input, inputWithWrapper} from "../../styles/common"
import AnimatedText from "../common/animated-text"
import AnimatedWrapper from "../common/animated-wrapper"

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
                    placeholderColor={!data.isError ? '#628a6c' : '#8a6262'}
                    onChange={e => inputState = {value: e.target.value}}
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

const Input = styled.input`
    ${inputWithWrapper}
    ${props => input(
        props.color, props.placeholderColor
    )}
    margin-bottom: 1em;
    animation: ${expandWidth()} 1s ease-out forwards;
`

const Button = styled.button`
    ${inputWithWrapper}
    ${props => input(props.color)}
    width: 51px;
    height: 23px;
    cursor: pointer;
    padding: 4px;
    transition: color .25s ease-out;

    :hover {
        color: black;
        border-radius: 3px;
        ::before {width: 100%;}
    }

    ::before {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        background-color: ${props => props.color};
        z-index: -1;
        transition: width .25s ease-out;
        ${center}
    }
`