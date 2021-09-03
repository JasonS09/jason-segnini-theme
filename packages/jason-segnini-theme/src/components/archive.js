import {connect, styled, css} from "frontity"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"
import Hide from "./hide"

const Archive = ({state, actions}) => {
    const isArchiveHidden = !state.theme.showArchive

    return (
        <AnimatedWrapper 
            absolute 
            width="297" 
            hideOffset="47" 
            isComponentHidden={isArchiveHidden}
        >
            <Hide 
                right 
                isComponentHidden={isArchiveHidden} 
                onClick={() => actions.theme.toggleArchive()}
            />
            <ArchiveContent>
                <AnimatedText 
                    comp="h2" 
                    text="Archive" 
                    css={css`margin-bottom: 1em`}
                />
                <br/>
                <AnimatedText comp="h3" text="Categories"/>
                <List categories/>
                <br/>
                <AnimatedText comp="h3" text="Latest Posts"/>
                <List maxnum="5"/>
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
    margin-left: 6em;
    margin-top: 1em;

    h2, h3 {
        color: #60d75a;
    }
`