import { connect, styled, css } from "frontity"
import {
    Fragment, 
    useState, 
    useRef
} from "react"
import AnimatedText from "../common/animated-text"

const CategoryList = ({state, ...rest}) => {
    const color = state.theme.color
    const data = state.source.get(state.source.customRestPage)
    const items = data.categories
    const ref = useRef({})

    const [states, setStates] = useState(() => {
        let states = {}

        items.forEach(category => 
            states = {
                ...states, 
                [category.id]: {}
            }
        )
        
        return states
    })

    const calculateDetailsHeight = (details, category, content) => 
        states[category].reanimate
            ? details.clientHeight - content.clientHeight
            : details.clientHeight + content.clientHeight

    const getInitDetailsHeight = category => {
        const det = ref.current[category]
        setStates(states => ({
            ...states,
            [category]: {detailsHeight: det.clientHeight}
        }))
    }

    const onSummaryClick = (e, category) => {
        const checkAllAnimationsFinished = () => {
            const finished = category.posts.filter(({id}) => 
                states[category.id].animationFinished?.[id]
            )

            if (finished.length === category.posts.length)
                return true
        }

        e.preventDefault()
        if (!states[category.id].detailsHeight
            || (states[category.id].reanimate 
                && !checkAllAnimationsFinished())) return
        const det = ref.current[category.id]
        det.open = true
        setStates(states => ({
            ...states, 
            [category.id]: {
                reanimate: !states[category.id].reanimate,
                detailsHeight: calculateDetailsHeight(
                    det, 
                    category.id, 
                    det.firstElementChild.nextElementSibling
                )
            }
        }))
    }

    return (
        <Items color={color} {...rest}>
            {data.isReady
                && items.map(item => {
                    const category = state.source.category[item.id]
                    return (
                        <Details 
                            key={category.id}
                            height={states[category.id].detailsHeight}
                            ref={det => ref.current[category.id] = det}
                        >
                            <AnimatedText 
                                key={`summary_${category.id}`} 
                                text={category.name}
                                comp='summary'
                                onAnimationFinished={() => getInitDetailsHeight(category.id)}
                                onClick={e => onSummaryClick(e, category)}
                                css={css`cursor: pointer`}
                            />
                            <Ul key={`list_${category.id}`}>
                                {category.posts.map(post => (
                                    <Fragment key={post.id}>
                                        <Li key={post.id}>
                                            <AnimatedText 
                                                key={post.id} 
                                                comp='a'
                                                link={post.link}
                                                text={post.title}
                                                data-speed='1'
                                                reanimate={states[category.id].reanimate}
                                                onAnimationFinished={() => 
                                                    setStates(states => ({
                                                        ...states,
                                                        [category.id]: {
                                                            ...states[category.id],
                                                            animationFinished: {
                                                                ...states[category.id].animationFinished,
                                                                [post.id]: true
                                                            }
                                                        }
                                                    }))
                                                }
                                                css={css`cursor: pointer`}
                                            />
                                        </Li>
                                    </Fragment>
                                ))}
                            </Ul>
                        </Details>
                    )
                })
            }
        </Items>
    )
}

export default connect(CategoryList)

const Details = styled.details`
    ${props => props.height 
        && css`height: ${props.height}px;`}
    overflow: hidden;
    transition: height .25s ease-out;
`

const Items = styled.div`
    a, summary {
        display: block;
        margin: 6px 0;
        color: ${props => props.color};
        text-decoration: none;
    }
`

const Li = styled.li`margin-left: 1em;`

const Ul = styled.ul`list-style-type: none;`