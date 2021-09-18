const customRest = {
    name: 'custom-rest',

    priority: 10,

    pattern: '/rest-page/',

    func: async ({link, libraries, state}) => {
        const catsResponse = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/categories/'
        })

        const categories = await libraries.source.populate({
            state,
            response: catsResponse,
            force: true
        })

        const menuResponse = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/menu/'
        })

        const menu = await libraries.source.populate({
            state,
            response: menuResponse
        })

        Object.assign(state.source.data[link], {
            categories: categories,
            menu: menu
        })
    }
}

export default customRest