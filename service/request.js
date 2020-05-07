// 引入url对象
import { urlMap } from './config'

// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
// 封装网络请求
// 同时发送异步请求的次数
let ajaxtime = 0
export default function (options) {
    // 判断url中是否带有 /my/ 请求的是私有的路径，带上header 和 token
    // let header = { ...options.header }
    // if (options.url.includes("/my/")) {
    //     // 拼接header 带上 token
    //     header["Authorization"] = token
    // }

    ++ajaxtime
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    options.url = urlMap.baseUrl + urlMap[options.name]
    return new Promise((resolve, reject) => {
        wx.request({
            ...options,
            // header,
            success: res => resolve(res),
            fail: err => reject(err),
            complete: () => {
                --ajaxtime
                if (ajaxtime === 0) {
                    wx.hideLoading()
                }
            }
        })
    })
}