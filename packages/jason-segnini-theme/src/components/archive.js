import {connect, styled, css} from "frontity"
import {useState} from "react"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"
import Hide from "./hide"

const Archive = ({state, actions}) => {
    const timeout = state.theme.startAnimationTimeout
    const isArchiveHidden = state.theme.showArchive ? false : true
    const [archiveMarginRight, setArchiveMarginRight] = useState('0')

    const hideArchive = () => {
        if (state.theme.showArchive) setArchiveMarginRight('-250px')
        else setArchiveMarginRight('0')
        actions.theme.toggleArchive()
    }

    return (
        <AnimatedWrapper absolute left width="297" hideOffset="47" css={css`margin-right: ${archiveMarginRight}`}>
            <Hide right isComponentHidden={isArchiveHidden} onClick={() => hideArchive()}/>
            <ArchiveContent>
                <AnimatedText comp="h2" data-timeout={timeout} text="Archive" css={css`margin-bottom: 1em`}/>
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