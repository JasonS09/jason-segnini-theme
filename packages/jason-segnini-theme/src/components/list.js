import { connect, styled } from "frontity"
import Link from "@frontity/components/link"

const List = ({state}) => {
    const data = state.source.get(state.router.link)
    const query = new URLSearchParams(state.router.link).get('s')

    const filteredPosts = (items, query) => {
        if (!query) {
            return items
        }

        return items.filter((item) => {
            const post = state.source[item.type][item.id]
            const postName = post.title.rendered.toLowerCase()
            const excerpt = post.excerpt.rendered.toLowerCase()
            return postName.includes(query) || excerpt.includes(query)
        })
    }

    return (
        <Items>
            {filteredPosts(data.items, query).map((item) => {
                const post = state.source[item.type][item.id]
                return (
                    <Link key={item.id} link={post.link}>
                        {post.title.rendered}
                        <br/>
                    </Link>
                )
            })}
            <PrevNextTab>
                {data.previous && (
                    <button
                    onClick={() => {
                        actions.router.set(data.previous)
                    }}
                    >
                        &#171; Prev
                    </button>
                )}
                {data.next && (
                    <button
                    onClick={() => {
                        actions.router.set(data.next)
                    }}
                    >
                        Next &#187;
                    </button>
                )}
            </PrevNextTab>
        </Items>
    )
}

export default connect(List)

const Items = styled.div`
    & > a {
        display: block;
        margin: 6px 0;
        font-size: 1.2em;
        color: steelblue;
        text-decoration: none;
    }
`

const PrevNextTab = styled.div`
    padding-top: 1.5em;

    & > button {
        background: #eee;
        text-decoration: none;
        padding: 0.5em 1em;
        color: #888;
        border: 1px solid #aaa;
        font-size: 0.8em;
        margin-right: 2em;
    }

    & > button:hover {
        cursor: pointer;
    }
`