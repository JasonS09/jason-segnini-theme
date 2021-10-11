import { connect, styled, css } from "frontity"
import { useRef, useEffect, useState } from "react"
import SearchBar from "./searchbar"
import AnimatedText from "../common/animated-text"
import AnimatedWrapper from "../common/animated-wrapper"
import PostList from "../post-list"
import Hide from "../common/hide"
import CategoryList from "./category-list"

const Archive = ({state, actions}) => {
    const isArchiveHidden = !state.theme.showArchive
    const [overflow, setOverflow] = useState('hidden')
    const scrollable = useRef(null)

    useEffect(() => {
        if (scrollable.current.clientHeight 
            < scrollable.current.scrollHeight
            && overflow === 'hidden')
            setOverflow('scroll')
        else if (scrollable.current.clientHeight 
            > scrollable.current.scrollHeight 
            && overflow === 'scroll')
            setOverflow('hidden')
    }, [state.screen.screenSize[1]])

    return (
        <AnimatedWrapper 
            type='absolute' 
            width='297' 
            hideOffset='47'
            isComponentHidden={isArchiveHidden}
        >
            <Hide 
                type='archive' 
                isComponentHidden={isArchiveHidden} 
                onClick={() => {
                    actions.theme.toggleArchive()

                    if (state.screen.isMobile 
                        && state.theme.showMenu)
                        actions.theme.toggleMenu()
                }}
            />
            <ArchiveContent color={state.theme.color}>
                <AnimatedText 
                    comp='h1'
                    text='Archive'
                    css={css`margin-bottom: 1em`}
                />
                <Scrollable overflow={overflow} ref={scrollable}>
                    <AnimatedText comp='h4' text='Categories'/>
                    <CategoryList css={css`margin-bottom: 1em`}/>
                    <AnimatedText comp='h4' text='Latest Posts'/>
                    <PostList css={css`margin-bottom: 2em`}/>
                    <SearchBar/>
                </Scrollable>
            </ArchiveContent>
        </AnimatedWrapper>
    )
}

export default connect(Archive)

const Scrollable = styled.div`
    max-height: calc(100vh - 8em);
    overflow-x: hidden;
    overflow-y: ${props => props.overflow};
`

const ArchiveContent = styled.div`
    position: relative;
    max-width: 175px;
    padding: 2em 10px 2em 1em;
    margin-left: 6em;
    margin-top: 1em;
    z-index: 1;
    h1 {font-family: 'Hacked';}

    h1, h4 {
        ${props => css`
            color: ${props.color};
            text-shadow: 0 0 3px ${props.color};
        `}
    }
`