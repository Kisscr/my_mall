Component({
  data: {},
  properties: {
    totalNum: {
      type: Number,
      value: 0
    },
    totalPrice: {
      type: Number,
      value: 0
    }
  },
  methods: {
    // 点击结算
    handlePay() {
      this.triggerEvent('pay')
    }
  },
  options: {
    multipleSlots: true
  }
})