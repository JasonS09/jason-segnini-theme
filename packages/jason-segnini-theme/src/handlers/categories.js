const categories = {
    name: 'categories',

    priority: 10,

    pattern: '/categories/',

    func: async ({link, libraries, state}) => {
        const catResponse = await libraries.source.api.get({
            endpoint: 'categories'
        })

        await libraries.source.populate({
            state,
            response: catResponse
        })

        const categories = state.source['category']
        const catArray = []

        for (const category of Object.values(categories).filter(
            category => !category.parent || category.parent === 0
        )) {

            const postsResponse = await libraries.source.api.get({
                endpoint: "posts",
                params: {categories: category.id}
            })

            const posts = await libraries.source.populate({
                state,
                response: postsResponse
            })

            let postsArray = []

            posts.forEach(post => {
                const data = state.source['post'][post.id]
                postsArray.push({
                    id: post.id,
                    title: data.title.rendered,
                    link: data.link
                })
            });

            catArray.push({
                id: category.id,
                name: category.name,
                posts: postsArray
            })
        }

        Object.assign(state.source.data[link], {
            items: catArray 
        })
    }
}

export default categories