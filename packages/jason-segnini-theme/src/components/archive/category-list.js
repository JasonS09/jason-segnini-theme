import { connect, styled, css } from "frontity"
import {
    Fragment, 
    useState, 
    useRef
} from "react"
import AnimatedText from "../common/animated-text"

const CategoryList = ({
    state,
    ...rest
}) => {
    const color = state.theme.color
    const data = state.source.get(state.source.customRestPage)
    const items = data.categories
    const details = useRef({})

    const [reanimateListItem, setReanimateListItem] = useState(() => {
        let reanimates = {}

        items.forEach(category => 
            reanimates = {
                ...reanimates, 
                [category.id]: {}
            }
        )
        
        return reanimates
    })

    const calculateDetailsHeight = (details, category, content) => 
        reanimateListItem[category].reanimate
            ? details.clientHeight - content.clientHeight
            : details.clientHeight + content.clientHeight

    const getInitDetailsHeight = category => {
        const det = details.current[category]
        setReanimateListItem(reanimateListItem => ({
            ...reanimateListItem,
            [category]: {detailsHeight: det.clientHeight}
        }))
    }

    const onSummaryClick = (e, category) => {
        e.preventDefault()
        if (!reanimateListItem[category].detailsHeight) return
        const det = details.current[category]
        det.open = true
        setReanimateListItem(reanimateListItem => ({
            ...reanimateListItem, 
            [category]: {
                reanimate: !reanimateListItem[category].reanimate,
                detailsHeight: calculateDetailsHeight(
                    det, 
                    category, 
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
                            height={reanimateListItem[category.id].detailsHeight}
                            ref={det => details.current[category.id] = det}
                        >
                            <AnimatedText 
                                key={`summary_${category.id}`} 
                                text={category.name}
                                comp='summary'
                                onAnimationFinished={() => getInitDetailsHeight(category.id)}
                                onClick={e => onSummaryClick(e, category.id)}
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
                                                reanimate={reanimateListItem[category.id].reanimate}
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