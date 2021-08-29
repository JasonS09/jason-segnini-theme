import {connect, styled, css} from "frontity"
import {useState} from "react"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"
import Hide from "./hide"

const Archive = ({state, actions}) => {
    const isArchiveHidden = !state.theme.showArchive
    const [archiveMarginRight, setArchiveMarginRight] = useState('0')
    const [hideStyles, setHideStyles] = useState({})

    const hideArchive = () => {
        if (state.theme.showArchive) {
            setArchiveMarginRight('-250px')
            setTimeout(() => {
                setHideStyles({
                    outer: 
                        'position: fixed; left: auto; right: 0; background-color: transparent;',
                    buttonBackground: 
                        'background-color: rgba(0,0,0,0.85);',
                    buttonPadding:
                        'padding: 3px 7px 0 5px;'
                })
            }, 700)
        }
        else {
            setArchiveMarginRight('0')
            setTimeout(() => {
                setHideStyles({})
            }, 300)
        }
        actions.theme.toggleArchive()
    }

    return (
        <AnimatedWrapper absolute left width="297" hideOffset="47" css={css`margin-right: ${archiveMarginRight}`}>
            <Hide 
                right 
                isComponentHidden={isArchiveHidden} 
                onClick={() => hideArchive()}
                css={css`
                        ${hideStyles.outer}

                        & > div {
                            ${hideStyles.buttonBackground}

                            & > div {
                                ${hideStyles.buttonPadding}
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