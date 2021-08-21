import {connect, styled, css} from "frontity"

const SearchBar = ({actions}) => {
    let inputState = {value: ''}

    const handleChange = (event) => {
        inputState = {value: event.target.value}
    }

    return (
        <>
            <Input type="text" onChange={handleChange} placeholder="Search blog posts."/>
            <Button onClick={() => actions.router.set("/?s="+inputState.value)}>Search</Button>
        </>
    )
}

export default connect(SearchBar);

const common = css`
    background-color: transparent;
    color: #60d75a;
    border-radius: 3px;
    border: 1px solid #60d75a;
`

const Input = styled.input`
    ${common}
    margin-bottom: 1em;

    :focus {
        outline: none;
    }
`

const Button = styled.button`
    ${common}
    cursor: pointer;
    padding: 2px;
    margin: auto;
    width: 50%;
    display: block;

    :hover {
        background-color: #60d75a;
        color: black;
    }
`