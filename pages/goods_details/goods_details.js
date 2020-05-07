import request from '../../service/request'

const TOP_DISTANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品id
    goods_id: 0,
    // 商品详细数据
    goodsObj: {},
    // 商品轮播图
    swpierList: [],
    // 是否显示返回顶部按钮
    isBackTopShow: false,
    // 是否收藏
    isCollected: false
  },

  // 存入商品的信息
  GoodsInfo: {},

  onLoad: function (options) {
    // 获取点击的商品的id
    const goods_id = options.goods_id
    // 设置商品id
    this.setData({
      goods_id
    })

    // 调用获取商品详情的方法
    this.getGoodsDetails(goods_id)
  },

  onShow() {
    // 获取页面栈，最后一页就是当前页面
    const curPages = getCurrentPages()
    const {goods_id} = curPages[curPages.length - 1].options
    this.getGoodsDetails(goods_id)

  },
  // 请求商品详情的方法
  async getGoodsDetails(goods_id) {
    const res = await request({ name: 'goodsInfo', data: { goods_id } })
    const goodsObj = res.data.message
    // 创建轮播图图片地址数组
    let swpierList = []
    goodsObj.pics.forEach(item => {
      swpierList.push({
        image_src: item.pics_mid
      })
    });

    this.GoodsInfo = goodsObj
    // 从缓存中获取收藏数组
    const collect = wx.getStorageSync("collect") || [];
    // 看当前商品是否在数组中
    const isCollected = collect.some(item => item.goods_id === this.GoodsInfo.goods_id)
      
    // 将 goodsObj 中有用的数据存储
    this.setData({
      goodsObj: {
        goods_id: goodsObj.goods_id,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      swpierList,
      isCollected
    })
  },

  // 点击轮播图，全屏预览大图
  handleChooseImage(e) {
    console.log(e)
    // 创建预览图片的数组
    const urls = this.data.swpierList.map(item => item.image_src)
    // 接收传递过来的当前图片的url
    const current = e.detail.currentUrl
    wx.previewImage({
      current,
      urls
    });

  },

  // 点击将当前商品加入购物车
  hangleAddToCart() {
    // 1. 先从缓存中获取购物车的数组
    let cart = wx.getStorageSync("cart") || [];
    
    // 2. 判断缓存是否存在
    if (!cart) {
      // 3. 商品不存在，第一次添加
      this.GoodsInfo.goods_count = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 4. 如果缓存中有数据，找出商品在缓存中的索引
      let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
      if (index === -1) {
        // 5. 如果索引为-1，则商品不存在，也是第一次添加
        this.GoodsInfo.goods_count = 1
        this.GoodsInfo.checked = true
        cart.push(this.GoodsInfo)
      } else {
        // 6. 如果已经存在,则数量递增
        cart[index].goods_count++
      }

    }

    // 5. 把购物车重新添加到缓存中
    wx.setStorageSync("cart", cart);

    // 6. 弹窗提示
    wx.showToast({
      title: '加入购物车成功',
      icon: "success",
      mask: true,
    });
  },

  // 点击立即购买
  handleBuyNow () {
    this.hangleAddToCart()

    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  // 点击收藏商品
  async handleCollect(){
    let isCollected = false

    // 获取缓存中收藏数据
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否在购物车中，如果在则删除，不在则添加
    let index = collect.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
    if(index !== -1){
      // 已经收藏，删除
      collect.splice(index, 1)
      isCollected = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      });
    }else{
      // 不在，添加
      collect.push(this.GoodsInfo)
      isCollected = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollected
    })
      
  },

  // 监听页面的滚动
  onPageScroll: function (options) {
    const flag = options.scrollTop >= TOP_DISTANCE
    if (flag != this.data.isBackTopShow) {
      this.setData({
        isBackTopShow: flag
      })
    }
  }
})