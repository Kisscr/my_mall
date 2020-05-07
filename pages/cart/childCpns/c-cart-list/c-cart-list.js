Component({
  data: {},
  properties: {
    cartlist: {
      type: Array,
      value: []
    }
  },
  methods: {
    // 改变商品的数量
    handleChangeCount(e) {
      const {operation, id} = e.currentTarget.dataset
      this.triggerEvent('changeCount', {operation, id})
    },

    // 改变商品的选中状态
    handleItemChange(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent('ItemChange',{id})
    }
  }
})