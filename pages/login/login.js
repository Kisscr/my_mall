// pages/login/login.js
Page({
  // 点击登录获取信息
  handleGetUserInfo(e) {
    const {userInfo} = e.detail
    // 存入缓存
    wx.setStorageSync("userInfo", userInfo);
    // 返回个人中心
    wx.navigateBack({
      delta: 1
    });
      
  }
})