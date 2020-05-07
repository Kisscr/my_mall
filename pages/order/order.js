// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['全部', '待付款', '待发货', '退款/退货'],
    order: []
  },

  onShow: function() {
    // 从缓存中获取购买的商品
    let order = wx.getStorageSync("order");
    console.log(order)
    order.forEach(item => {
      item.time = this.dateFormat(item.time)
    })

    this.setData({
      order
    })
  },

  dateFormat (time) {
    const date = new Date(parseInt(time) * 1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second
  }
  
})