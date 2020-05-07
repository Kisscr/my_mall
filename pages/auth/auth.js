import request from "../../service/request"
import {
  login
} from "../../utils/asyncWx"

Page({
  // 点击授权
  async hangdleGetUserInfo(e) {
    // 1. 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail
    // 2. 获取code值
    const { code } = await login()
    const loginParams = {
      encryptedData, rawData, iv, signature, code
    }
    console.log(loginParams)
    // 3. 发送请求，获取用户的token
    // 由于没有企业级appid，无法获取token
    const res = await request({ url: "userToken", data: loginParams, method: "POST" })
    console.log(res)
    
    // 4. 返回上一层
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
      
  }
})