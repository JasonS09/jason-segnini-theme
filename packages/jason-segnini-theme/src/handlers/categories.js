const categories = {
    name: 'categories',

    priority: 10,

    pattern: '/categories/',

    func: async ({link, libraries, state}) => {
        const response = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/categories/'
        })

        const categories = await response.json()

        Object.assign(state.source.data[link], {
           items: categories
        })
    }
}

export default categories