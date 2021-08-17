import {styled} from "frontity"
import SearchBar from "./searchbar"
import AnimatedText from "./animated-text"
import AnimatedWrapper from "./animated-wrapper"
import PostList from "./post-list"

const Archive = () => (
    <AnimatedWrapper absolute left width="250">
        <ArchiveContent>
            <AnimatedText comp="h2" data-timeout="3000" text="Archive"/>
            <br/>
            <SearchBar/>
            <br/>
            <AnimatedText comp="h3" data-timeout="3000" text="Categories"/>
            <Items>
                <AnimatedText comp="a" data-timeout="3000" link="/category/test/" text="Test"/>
                <br/>
            </Items>
            <AnimatedText comp="h3" data-timeout="3000" text="Last Posts"/>
            <PostList maxnum="5" animationTimeout="3000"/>
        </ArchiveContent>
    </AnimatedWrapper>
)

export default Archive

const ArchiveContent = styled.div`
    max-width: 175px;
    padding: 2em 1em;
    margin: 0 0 0 1em;

    h2, h3 {
        color: #60d75a;
    }
`

const Items = styled.div`
    a {
        display: block;
        margin: 6px 0;
        font-size: 1.2em;
        color: #60d75a;
        text-decoration: none;
    }
`