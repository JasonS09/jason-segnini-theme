import {connect, styled, css} from "frontity"
import {glowForText} from "../styles/keyframes"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"
import Hide from "./hide"

const Archive = ({state, actions}) => {
    const isArchiveHidden = !state.theme.showArchive

    return (
        <AnimatedWrapper 
            type='absolute' 
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
                    css={css`margin-bottom: 8px`}
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
    position: relative;
    max-width: 175px;
    padding: 2em 1em;
    margin-left: 6em;
    margin-top: 1em;
    z-index: 2;

    h2 {
        font-family: 'Hacked';
        font-size: 30px;
    }

    h2, h3 {
        color: #60d75a;
        animation: 
            ${glowForText} 3s ease-out alternate infinite;
    }
`