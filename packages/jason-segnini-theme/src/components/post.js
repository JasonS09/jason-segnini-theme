import { connect, Head, styled, css } from "frontity"
import { expandWidth, makeAppear } from "../styles/keyframes"
import { select } from "../scripts/utilities"
import { useState, useEffect, useRef } from "react"
import dayjs from "dayjs"
import AnimatedWrapper from "./common/animated-wrapper"
import Comments from "./comments/comments"
import ContactForm from "./contact-form"

const Post = ({state, actions, libraries}) => {
    const data = state.source.get(state.router.link)
    const post = state.source[data.type][data.id]
    const author = state.source.author[post.author]
    const mediaUrl = state.source.attachment[post.featured_media]?.source_url
    const color = state.theme.color
    const formattedDate = dayjs(post.date).format('DD MMMM YYYY')
    const Html2React = libraries.html2react.Component
    const [states, setStates] = useState({})
    const maxHeight = data.isPost 
    ? state.screen.screenSize[1]
        - (states.titleHeight || 0)
        - (states.infoHeight || 0)
        - state.comments.commentsHeight.container
        - 32-25-13-3
    : state.screen.screenSize[1] - 100
    const refs = useRef({})

    const onSelectionChange = () => {
        const selected = select()+''

        if (ref.current.postcontent.textContent.includes(
                selected.replace(/[\n\r]/g, '')
            )) {
            setStates(states => ({
                ...states,
                selection: selected
            }))
        }
        else setStates(states => ({
            ...states,
            selection: ''
        }))
    }

    const onMouseDown = () => 
        setStates(states => ({
            ...states,
            selection: ''
        }))

    useEffect(() => {
        if (data.isPost) {
            if (state.screen.isMobile)
                document.addEventListener('selectionchange', onSelectionChange)
            else
                window.addEventListener('mousedown', onMouseDown)

            setStates(states => ({
                ...states,
                titleHeight: refs.current.title.clientHeight,
                infoHeight: refs.current.postinfo.clientHeight
            }))

            return () => {
                document.removeEventListener('selectionchange', onSelectionChange)
                window.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [])

    return (
        <div css={!state.screen.isMobile
            ?
            css`
                display: flex;
                gap: 10px;
            `
            : undefined
        }>
            {data.isHome 
                && 
                <AnimatedWrapper shadows css={imgWrapperStyles(color, state.screen.isMobile)}> 
                    <ImgShadow> 
                        <Img src={mediaUrl} alt='Picture of myself.'/> 
                    </ImgShadow>
                </AnimatedWrapper>
            }
            <AnimatedWrapper type='polygonal' css={wrapperStyles}>
                <Head>
                    <title>{post.title.rendered}</title>
                    <meta name="description" content={post.excerpt.rendered}/>
                    <meta name="image" content={mediaUrl}/>
                </Head>
                {!data.isHome 
                    && 
                    <H1 
                        ref={title => refs.current.title = title}
                    >{post.title.rendered}
                    </H1>
                }
                {data.isPost 
                    && 
                    <PostInfo 
                        ref={postinfo => refs.current.postinfo = postinfo}
                        color={color}
                    >
                        <p>
                            <strong>Posted: </strong>
                            {formattedDate}
                        </p>
                        <p>
                            <strong>Author: </strong>
                            {author.name}
                        </p>
                    </PostInfo>
                }
                <PostContent
                    color={color}
                    maxHeight={maxHeight}
                    isMobile={state.screen.isMobile} 
                    onMouseUp={!state.screen.isMobile
                        ? () => setStates(states => ({
                            ...states,
                            selection: select()+''
                        }))
                        : undefined
                    }
                    ref={postcontent => refs.current.postcontent = postcontent}
                >
                    {state.router.link === '/contact/'  
                        ? <ContactForm/>
                        : <Html2React html={post.content.rendered}/>
                    }
                </PostContent>
                {data.isPost
                    &&
                    <Options color={color}>
                        {states.selection
                            &&
                            <span 
                                onMouseDown={() =>
                                    actions.comments.updateFields(
                                        data.id,
                                        {content: 
                                            '<blockquote>\r\n'
                                                +
                                                `${author.name} said:\r\n\r\n${states.selection}\r\n`
                                            +
                                            '</blockquote>'
                                        }
                                    )}
                            >Quote</span>
                        }
                    </Options>
                }
            </AnimatedWrapper>
            {data.isPost && <Comments postId={data.id}/>}
        </div>
    )
}

export default connect(Post)

const ImgShadow = styled.div`
    position: relative;
    border-radius: 3px;
    filter: opacity(0);
    animation: ${makeAppear()} .25s ease-out .25s forwards;

    ::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 5px black;
    }
`

const imgWrapperStyles = (color, isMobile) => css`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    ${isMobile && css`margin: auto;`}
    margin-bottom: 10px;
    background-color: rgba(0,0,0,.85);
    transition: transform .25s ease-out,
        box-shadow .25s ease-out;

    :hover {
        box-shadow: 0 0 20px ${color};
        transform: scale(1.01, 1.01);

        ::before, ::after {
            border-width: 2px;
            transition: none;
        }
    }

    ::before, ::after {
        transition: border-width 0s .25s;
        z-index: 1;
    }
`

const Img = styled.img`
    display: block;
    height: 34vh;
    max-width: 250px !important;
    max-height: 277px;
    border-radius: inherit;
`

const H1 = styled.h1`
    font-family: 'Hacked';
    text-align: center;
    padding: 0 5px;
    margin-bottom: 3px;
    box-decoration-break: clone;
`

const Options = styled.div`
    position: relative;
    width: 100%;
    height: 25px;
    text-align: right;
    color: ${props => props.color};
    padding-bottom: 3px;
    padding-right: 5px;

    span {
        cursor: pointer;
        transition: text-shadow .25s ease-out;
        :hover {text-shadow: 0 0 2px ${props => props.color}}
    }
`

const PostInfo = styled.div`
    position: relative;
    margin-bottom: 1em;
    padding: 0.5em;
    font-size: 0.8em;

    ::before {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        border-width: 1px 0;
        border-style: solid;
        border-color: ${props => props.color};
        transition: border-width 0s .25s;
        animation: 
            ${expandWidth(50)} .25s ease-out forwards;
    }
`

const PostContent = styled.div`
    max-height: ${props => props.maxHeight}px;
    color: ${props => props.color};
    text-align: justify;
    padding: 10px 1em 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: max-height 1s ease-out;
    p {margin-bottom: 1em;}
    h1, h2, h3, h4, h5, h6 {margin-bottom: 5px;}
    
    ${props => props.isMobile 
        && css`
            div {
                    float: none;
                    margin: auto;
                    margin-bottom: 10px;
                }
        ` 
    }
`

const wrapperStyles = css`
    flex: 1;
    height: fit-content;

    :hover{
        ${PostInfo} {
            ::before {
                border-top-width: 2px;
                border-bottom-width: 2px;
                transition: none;
            }
        }
        
        ${PostContent} {
            form div::before,
            form div::after {
                border-width: 2px;
                transition: none;
            }
        }   
    }

    & > div:nth-of-type(2) {padding: 10px 5px 10px 0;}
`