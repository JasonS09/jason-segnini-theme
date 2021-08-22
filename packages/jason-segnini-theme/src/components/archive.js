import {connect, styled, css} from "frontity"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"

const Archive = ({state}) => {
    const timeout = state.theme.startAnimationTimeout

    return (
        <AnimatedWrapper absolute left width="250">
            <ArchiveContent>
                <AnimatedText 
                    comp="h2" data-timeout={timeout} text="Archive" css={css`margin-bottom: 1em`}/>
                <br/>
                <AnimatedText comp="h3" data-timeout={timeout} text="Categories"/>
                <List animationTimeout={timeout} categories/>
                <br/>
                <AnimatedText comp="h3" data-timeout={timeout} text="Latest Posts"/>
                <List maxnum="5" animationTimeout={timeout}/>
                <br/>
                <SearchBar/>
            </ArchiveContent>
        </AnimatedWrapper>
    )
}

export default connect(Archive)

const ArchiveContent = styled.div`
    max-width: 175px;
    padding: 2em 1em;
    margin: auto;

    h2, h3 {
        color: #60d75a;
    }
`