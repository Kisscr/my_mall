// pages/profile/profile.js
Page({
  data: {
    userInfo: {},
    collectNum: 0
  },

  onShow: function() {
    // 从缓存中获取userinfo
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })

    // 从缓存中获取收藏的数组
    const collect = wx.getStorageSync("collect");
    const collectNum = collect.length
    this.setData({
      collectNum
    })
  },
})