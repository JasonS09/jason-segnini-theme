const plainCommentContent = {
    name: 'plain-comment-content',

    priority: 10,

    pattern: '/jasonsegnini/v1/comments',

    func: async ({link, libraries, state}) => {
        const response = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/comments/',
            params: {post_id: libraries.source.parse(link).query.post_id}
        })

        const items = await response.json()

        items.forEach(item => 
            Object.assign(
                state.source.comment[item.id].content, 
                item.content
            )
        )
    }
}

export default plainCommentContent