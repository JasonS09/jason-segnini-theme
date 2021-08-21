import {styled, css} from "frontity"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import List from "./list"

const Archive = () => (
    <AnimatedWrapper absolute left width="250">
        <ArchiveContent>
            <AnimatedText comp="h2" data-timeout="3000" text="Archive" css={css`margin-bottom: 1em`}/>
            <br/>
            <AnimatedText comp="h3" data-timeout="3000" text="Categories"/>
            <List animationTimeout="3000" categories/>
            <br/>
            <AnimatedText comp="h3" data-timeout="3000" text="Latest Posts"/>
            <List maxnum="5" animationTimeout="3000"/>
            <br/>
            <SearchBar/>
        </ArchiveContent>
    </AnimatedWrapper>
)

export default Archive

const ArchiveContent = styled.div`
    max-width: 175px;
    padding: 2em 1em;
    margin: auto;

    h2, h3 {
        color: #60d75a;
    }
`

const Items = styled.div`
    a {
        display: block;
        margin: 6px 0;
        color: #60d75a;
        text-decoration: none;
    }
`