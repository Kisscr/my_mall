// pages/goods_details/childCpns/c-tools/c-tools.js
Component({

  options: {
    multipleSlots: true
  },

  methods: {
    // 发送加入购物车
    addToCart() {
      this.triggerEvent("addToCart")
    },

    // 点击立即购买
    buyNow() {
      this.triggerEvent('buyNow')
    }

  }
})
