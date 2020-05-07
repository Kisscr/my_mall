// components/c-goods-item/c-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsItem: {
      type: Object,
      value: {}
    }
  },
  
  options: {
    multipleSlots: true, // 启用多插槽配置
    styleIsolation: 'apply-shared'
  }
})
