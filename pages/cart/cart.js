import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address: {},
    // 购物车数据
    cart: [],
    // 全选按钮的状态
    allChecked: true,
    // 商品的总数量
    totalNum: 0,
    // 商品的总价格
    totalPrice: 0
  },

  onShow: function () {
    // 获取本地存储中的地址信息
    const address = wx.getStorageSync("address")
    this.setData({
      address
    })

    // 获取本地存储中购物车的数据
    const cart = wx.getStorageSync("cart")
    // const allChecked = cart.every(item => item.checked)   省略这次遍历，提高效率
    this.setCart(cart)

  },

  // 点击选择收获地址
  async hangdleGetAddress() {
    try {
      // 1. 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      // 2. 判断地址的权限状态，如果authSetting中的scope.address属性是undefined或者true，就都可以调用wx.chooseAddress
      if (scopeAddress === false) {
        // 3. 如果 scopeAddress 为false，引导客户打开设置权限，选中后返回则状态为 true
        await openSetting()
      }
      // 4. 用户设置权限后，立马调用获取地址api
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 5. 把获取到的收货地址存储到本地存储中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error)
    }
  },

  // 商品的选中
  handleItemChange(e) {
    // 获取当前点击的商品goods_id
    const id = e.detail.id
    // 获取购物车里面的数据
    let { cart } = this.data
    // 获取购物车中当前id的商品的索引
    let index = cart.findIndex(item => item.goods_id === id)
    // 将商品的状态值取反
    cart[index].checked = !cart[index].checked

    this.setCart(cart)
  },

  // 点击全选
  handleAllCheck() {
    // 获取data中的变量
    let { allChecked, cart } = this.data
    // 直接取反
    allChecked = !allChecked
    // 遍历购物车中的商品，将状态全部设置成当前全选按钮状态
    cart.forEach(item => item.checked = allChecked)
    // 更新数据和缓存
    this.setCart(cart)

  },

  // 商品数量的加减
  async handleChangeCount(e) {
    try {
      // 获取点击商品的id和operation
      const { id, operation } = e.detail
      // 获取购物车数组
      let { cart } = this.data
      // 获取当前点击商品在购物车中的索引
      let index = cart.findIndex(item => item.goods_id === id)

      const options = {
        title: '提示',
        content: '确定删除该商品吗？'
      }
      // 当数量为0，并且用户点击了-1
      if (cart[index].goods_count === 1 && operation === -1) {
        const res = await showModal(options)
        console.log(res)
        if (res.confirm) {
          // 确定则删除cart中的这一项数据
          cart.splice(index, 1)
          this.setCart(cart)
        }
      } else {
        // 正常进行数量计算
        cart[index].goods_count += operation

        // 计算并更新数据
        this.setCart(cart)
      }
    } catch (error) {
      console.log(error)
    }
  },

  // 点击结算按钮
  async handlePay() {
    // 获取购物车数据和地址
    const { totalNum, address } = this.data
    // 判断是否有值
    if (!address.userName) {
      await showToast({ title: '你不写地址寄个🔨？' })
      return
    }
    if (totalNum === 0) {
      await showToast({ title: '都没东西你买个🔨？' })
      return
    }
    // 都添加了以后，跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
      
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

    wx.setStorageSync("cart", cart);
  }
})