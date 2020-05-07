import request from '../../service/request'

const TOP_DISTANCE = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏的标题
    tabList: ['综合', '销量', '价格'],
    // 当前搜索商品的数据
    goods: [],
    // 当前点击的tab索引
    currentIndex: 0,
    // 返回顶部是否显示
    isBackTopShow: false
  },

  // 定义请求参数的对象
  params: {
    cid: '',
    query: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: '',


  onLoad: function (options) {
    this.params.cid = options.cid || ''
    this.params.query = options.query || ''
    // 调用请求商品搜索列表的方法
    this.getGoodsList(this.data.currentIndex)
  },

  // 监听页面是否滚动到底部
  onReachBottom: function () {

    // 每次触底让页码加1
    this.params.pagenum += 1
    // 判断当前页码是否大于总页数
    if (this.params.pagenum >= this.totalPages) {
      wx.showToast({
        title: '到底啦，莫得啦~~',
        icon: 'none',
        duration: 2000
      });
    } else {
      // 然后发送请求
      this.getGoodsList(this.data.currentIndex)
    }

  },

  // 定义排序函数
  // compare: function (prop) {
  //   return function (a, b) {
  //     const value1 = a[prop]
  //     const value2 = b[prop]
  //     return value2 - value1
  //   }
  // },

  // 点击tab栏进行切换
  handleTabSwitch(e) {
    this.setData({
      currentIndex: e.detail.currentIndex
    })
  },

  // 定义请求商品列表的方法
  async getGoodsList() {
    const res = await request({ name: 'goodsSearch', data: this.params })

    // 将获取的数据
    const newgoods = res.data.message.goods

    // 判断数组内是否有内容,没有的话，弹出提示
    if (!newgoods[0]) {
      wx.showToast({
        title: '抱歉，暂时没有此类商品',
        icon: 'none',
        duration: 1200,
        mask: true
      })
    }

    // 获取总页数
    this.totalPages = Math.ceil(res.data.message.total / this.params.pagesize)

    // 将旧数组和新数组先解构再进行拼接
    this.data.goods = [...this.data.goods, ...newgoods]

    // 赋值
    this.setData({
      goods: this.data.goods
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

  // 筛选数据的方法
  // filterData() {
  //   // 判断点击的是那个tab
  //   if (currentIndex == 0) {
  //     this.setData({
  //       goods: this.data.goods
  //     })
  //   } else if (currentIndex == 2) {
  //     // 先将data清空

  //     // 然后将重新排序的数组加入到新数组中
  //     this.data.goods.sort(this.compare('goods_price'))
  //   }
  // }
})