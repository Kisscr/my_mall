import request from '../../../../service/request'

Component({
  data: {
    // 分类左侧数据
    cateLeft: [],
    // 分类右侧数据
    cateRight: [],
    // 当前点击的分类的索引
    currentIndex: 0,
    // 页面的滚动距离
    scrollTop: 0
  },

  // 分类的总数据
  cates: [],

  // ---------------------组件的生命周期函数
  lifetimes: {
    // 组件实例被挂载到页面中时执行
    attached: function () {
      // 1. 先判断一下本地存储中有没有旧的数据
      // 2. 没有旧数据，直接发送新请求
      // 3. 如果有旧的数据，并且没有过期，就使用本地存储中的旧数据即可

      // 获取本地存储中的数据
      const localCates = wx.getStorageSync('cates')
      // 判断
      if (!localCates) {
        // 如果没有，则重新请求数据
        this.getCateData()
      } else {
        // 如果有数据，判断数据是否过期
        if (Date.now() - localCates.time > 1000 * 60 * 5) {
          // 重新请求数据
          this.getCateData()
        } else {
          // 如果没有过期
          this.cates = localCates.data

          const cateLeft = this.cates.map(item => item.cat_name)
          const cateRight = this.cates[0].children
          this.setData({
            cateLeft,
            cateRight
          })
        }
      }
    }
  },
  // ---------------------组件的生命周期函数


  properties: {
  },
  methods: {
    // 定义请求数据的方法
    // 使用es7的语法异步请求分类数据的方法
    async getCateData() {
      const res = await request({ name: 'goodsCategory' })
      // 赋值给cates
      this.cates = res.data.message

      // 获取到的数据存入本地存储中,格式为存入时的时间戳和数据
      wx.setStorageSync("cates", { time: Date.now(), data: this.cates });

      const cateLeft = this.cates.map(item => item.cat_name)
      const cateRight = this.cates[0].children
      this.setData({
        cateLeft,
        cateRight
      })
    },


    // 点击切换分类列表
    handleSwitchCate(e) {
      // 1. 获取点击的索引
      const currentIndex = e.detail.currentIndex
      const scrollTop = e.detail.scrollTop
      
      // 2. 根据索引获取当前分类的数据，筛选出有值的数组
      const cateRight = this.cates[currentIndex].children.filter(item => item.children)
      // 3. 赋值
      this.setData({
        currentIndex,
        cateRight,
        scrollTop
      })

    }
  }

})