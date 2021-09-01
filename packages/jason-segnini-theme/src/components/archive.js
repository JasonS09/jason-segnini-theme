import {connect, styled, css} from "frontity"
import {useState} from "react"
import {hide} from "../scripts/hide"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"
import Hide from "./hide"

const Archive = ({state, actions}) => {
    const isArchiveHidden = !state.theme.showArchive
    const [archiveMarginRight, setArchiveMarginRight] = useState('0')
    const [hideStyles, setHideStyles] = useState({})

    return (
        <AnimatedWrapper absolute width="297" hideOffset="47" css={css`margin-right: ${archiveMarginRight}`}>
            <Hide 
                right 
                isComponentHidden={isArchiveHidden} 
                onClick={() => hide(
                    state.theme.showArchive,
                    setHideStyles,
                    'padding-left: 0; padding-right: 2px;',
                    setArchiveMarginRight,
                    'position: fixed; left: auto; right: 1em;',
                    actions.theme.toggleArchive
                )}
                css={css`
                        ${hideStyles.outer}

                        & > div {
                            & > div {
                                h1 {
                                    ${hideStyles.iconPadding}
                                }
                            }
                        }
                    `}
                />
            <ArchiveContent>
                <AnimatedText comp="h2" text="Archive" css={css`margin-bottom: 1em`}/>
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