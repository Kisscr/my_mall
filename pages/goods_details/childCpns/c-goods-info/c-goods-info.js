// pages/goods_details/childCpns/c-goods-info/c-goods-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsObj: {
      type: Object,
      value: {}
    }
  },
  options: {
    multipleSlots: true
  },
  methods: {
    handleCollect() {
      this.triggerEvent('collect')
    }
  }
})
