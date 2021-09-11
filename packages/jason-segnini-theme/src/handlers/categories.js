const categories = {
    name: 'categories',

    priority: 10,

    pattern: '/',

    func: async({libraries, state}) => {
      const response  = await libraries.source.api.get({
        endpoint: 'categories'
      })

      const [categories] = await libraries.source.populate({
          response,
          state
      })
    }
  }