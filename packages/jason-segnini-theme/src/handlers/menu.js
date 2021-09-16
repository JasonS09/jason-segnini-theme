const menu = {
    name: 'menu',

    priority: 10,

    pattern: '/rest-page/',

    func: async ({link, libraries, state}) => {
        const response = await libraries.source.api.get({
            endpoint: '/jasonsegnini/v1/menu/'
        })

        const menu = await response.json()

        Object.assign(state.source.data[link], {
            ...state.source.data[link],
            menu: menu
        })
    }
}

export default menu