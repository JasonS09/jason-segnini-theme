import {connect} from "frontity"

const SearchBar = ({actions}) => {
    let inputState = {value: ''}

    const handleChange = (event) => {
        inputState = {value: event.target.value}
    }

    return (
        <>
            <input type="text" onChange={handleChange} placeholder="Search blog posts."/>
            <button onClick={() => actions.router.set("/?s="+inputState.value)}>Search</button>
        </>
    )
}

export default connect(SearchBar);