import request from "../../service/request"
import {
  requestPayment,
  showToast
} from "../../utils/asyncWx"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
  },

  onShow: function () {
    // 定义一个token
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    // 将token存入缓存中
    wx.setStorageSync("token", token);

    // 获取缓存中的地址
    const address = wx.getStorageSync("address");

    // 获取缓存中的购物车里的数据
    let cart = wx.getStorageSync("cart");
    // 筛选出checked为true的商品
    cart = cart.filter(item => item.checked)

    // 计算总数量和总价格
    let totalNum = 0
    let totalPrice = 0
    for (let item of cart) {
      if (item.checked) {
        totalNum += item.goods_count
        totalPrice += item.goods_count * item.goods_price
      }
    }

    // 同步到页面上
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })

  },

  // 点击支付按钮
  async handleOrderPay() {
    try {
      // 1. 获取缓存中的token
      const token = wx.getStorageSync("token");
      // 2. 如果没有则跳转到授权页面
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
      }

      // 3. 如果有token，准备参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const goods = []
      this.data.cart.map(item => goods.push({
        goods_id: item.goods_id,
        goods_number: item.goods_count,
        goods_price: item.goods_price
      }))
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }

      // 准备请求头参数
      const header = { Authorization: token }

      // 4. 发送请求 创建订单，获取订单编号
      const res1 = await request({ name: "createOrder", method: "POST", data: orderParams, header })
      const { order_number } = res1.data.message
      // console.log(order_number)

      // 5. 发起预支付接口
      const res2 = await request({ name: "payParams", method: "POST", header, data: { order_number } })
      const { pay } = res2.data.message
      // console.log(pay)

      // 6. 发起微信支付
      // const res3 = await requestPayment(pay)

      // // 7. 查询后台订单状态
      // const res4 = await request({ name: "orderState", method: "POST", header, data: { order_number } })
      // console.log(res4)

      // 8. 弹窗提示
      if (order_number) {
        await showToast({ title: "支付成功，请注意短信提示" })


        // 清空提交的购物车的数据和缓存中数据
        let cart = wx.getStorageSync("cart");
        // 将没有选中的商品过滤出来，然后重新加入缓存
        const newCart = cart.filter(item => !item.checked)
        wx.setStorageSync("cart", newCart);

        // 将选中的商品过滤出来，加入新的缓存中，就是已购买商品
        let payOrder = wx.getStorageSync("order") || [];
        const newOrder = cart.filter(item => item.checked)
        payOrder.push({
          newOrder,
          time: Date.parse(new Date()) / 1000
        })
        wx.setStorageSync("order", payOrder)


        // 9. 支付成功，跳转到我的订单页面
        wx.navigateTo({
          url: '/pages/order/order'
        });
      }

    } catch (error) {
      // 弹窗提示
      await showToast({ title: "支付失败" })
      console.log(error)
    }






  },

  // 计算购物车中商品的价格和数量，并存储到data和缓存中
  setCart(cart) {
    let allChecked = true
    // 计算总数量和总价格
    let totalNum = 0
    let totalPrice = 0
    for (let item of cart) {
      if (item.checked) {
        totalNum += item.goods_count
        totalPrice += item.goods_count * item.goods_price
      } else {
        allChecked = false
      }
    }

    // 如果cart是空数组
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })

  }
})