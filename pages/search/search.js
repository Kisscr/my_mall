import request from "../../service/request"

Page({
  data: {
    // 搜索到的数据
    search: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputValue: ''
  },

  // 定义一个全局的定时器
  timer: null,

  // 
  clearTimer: null,

  // 监听input中输入的值的改变
  handleSearch(res) {
    // 1. 获取输入的值
    const { value } = res.detail

    if (this.clearTimer) {
      clearTimeout(this.clearTimer)
    }
    // 2. 校验输入的值
    if (!value.trim()) {
      // 如果填入的值为空字符串，则直接返回
      this.clearTimer = setTimeout(() => {
        this.setData({
          isFocus: false,
          search: [],
          inputValue: ''
        })
      }, 1000)
      return
    }
    this.setData({
      isFocus: true
    })
    // 防抖的实现
    // 当输入时，如果有定时器，则清除上一个定时器，没有则继续往下
    if (this.timer) {
      clearTimeout(this.timer)
    }

    // 开启一个1秒的定时器，如果没有输入内容，则不会清除定时器，就会发送请求
    this.timer = setTimeout(() => {
      // 发送搜索请求
      this.getSearchData(value)
    }, 1000)

  },

  // 发送搜索请求的方法
  async getSearchData(query) {
    const res = await request({ name: "goodsQsearch", data: { query } })

    this.setData({
      search: res.data.message
    })
  },

  // 点击取消搜索
  handleCancelSearch() {
    this.setData({
      inputValue: '',
      isFocus: false,
      search: []
    })
  }
})