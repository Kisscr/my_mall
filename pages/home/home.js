import request from '../../service/request';

Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数据
    tabList: [],
    // 楼层数据
    floorList: []
  },

  onLoad: function (options) {
    // 请求轮播图数据
    this.getSwiperData()
    // 请求导航数据
    this.getTabData(),
    // 请求楼层数据
    this.getFloorData()
  },


  // 请求轮播图数据的方法
  getSwiperData() {
    request({
      name: 'swiper'
    }).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },

  // 请求导航数据的方法
  getTabData() {
    request({
      name: 'tab'
    }).then(res => {
      this.setData({
        tabList: res.data.message
      })
    })
  },

  // 请求楼层的数据
  getFloorData () {
    request({name: 'floor'}).then(res => {
      const floorList = res.data.message
      floorList.forEach(item => {
        item.product_list.forEach(item2 => {
          item2.navigator_url = item2.navigator_url.replace('/goods_list', '/goods_list/goods_list')
        })
      })
      this.setData({
        floorList
      })
    })
  }
})