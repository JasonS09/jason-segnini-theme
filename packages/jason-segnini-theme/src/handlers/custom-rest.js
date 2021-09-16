const customRest = {
    name: 'custom-rest',

    priority: 10,

    pattern: '/rest-page/',

    func: async ({link, libraries, state}) => {
        const catsResponse = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/categories/'
        })

        const categories = await catsResponse.json()

        const menuResponse = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/menu/'
        })

        const menu = await menuResponse.json()

        Object.assign(state.source.data[link], {
            categories: categories,
            menu: menu
        })
    }
}

export default customRest