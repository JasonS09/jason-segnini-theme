import { connect, styled } from "frontity"

const SearchBar = () => {
    let inputState = {value: ''}

    const handleChange = (event) => {
        inputState = {value: event.target.value}
    }

    return (
        <>
        <label htmlFor="header-search">
            <VisuallyHidden className="visually-hidden">Search blog posts</VisuallyHidden>
        </label>
        <input type="text" onChange={handleChange} placeholder="Search blog posts."/>
        <button onClick={() => actions.router.set("/?s="+inputState)}>Search</button>
        </>
    )
}

export default connect(SearchBar);

const VisuallyHidden = styled.span`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`