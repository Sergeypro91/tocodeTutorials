export default {
  state: {
    shopList: [
      {
        id: 1,
        title: 'Nike Red',
        descr: 'Some lorem text for lorem',
        img: require('../assets/img/1.png')
      },
      {
        id: 2,
        title: 'Nike default',
        descr: 'Some lorem text for lorem',
        img: require('../assets/img/4.png')
      },
      {
        id: 3,
        title: 'Nike Grean',
        descr: 'Some lorem text for lorem',
        img: require('../assets/img/7.png')
      },
      {
        id: 4,
        title: 'Nike Street',
        descr: 'Some lorem text for lorem',
        img: require('../assets/img/10.png')
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getShopList(state) {
      return state.shopList
    }
  }
}
