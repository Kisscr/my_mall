// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['商品收藏', '品牌收藏', '店铺收藏', '浏览足迹'],
    collect: []
  },

  onShow: function() {
    // 获取缓存中收藏
    const collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  }
})