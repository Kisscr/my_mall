// pages/goods_list/childCpns/c-tab/c-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tablist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabIndex (e) {
      // 获取点击的索引
      const currentIndex = e.currentTarget.dataset.index

      this.setData({
        currentIndex
      })

      // 将索引值发射给父组件
      this.triggerEvent('tabIndex', {currentIndex})
    }
  }
})
