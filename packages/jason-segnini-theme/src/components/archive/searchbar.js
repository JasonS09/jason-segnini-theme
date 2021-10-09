import { connect, styled, css } from "frontity"
import { expandWidth } from "../../styles/keyframes"
import { input, inputWithWrapper, submit } from "../../styles/common"
import { useState } from "react"
import AnimatedText from "../common/animated-text"
import AnimatedWrapper from "../common/animated-wrapper"

const SearchBar = ({state, actions}) => {
    const data = state.source.get(state.router.link)
    const color = state.theme.color
    const [value, setValue] = useState('')
    
    return (
        <>
            <AnimatedWrapper css={css`padding-left: 1px;`}>
                <Input 
                    type='text'
                    placeholder='Search blog posts.'
                    color={color}
                    placeholderColor={!data.isError ? '#628a6c' : '#8a6262'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </AnimatedWrapper>
            <AnimatedWrapper shadows css={css`
                width: fit-content;
                margin: auto;
            `}>
                <Button 
                    color={color}
                    onClick={() => actions.router.set('/?s='+value)}
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
    ${props => submit(props.color)}
`