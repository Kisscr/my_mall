Component({
  data: {
    currentIndex : 0
  },
  properties: {
    catenames: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleCateTap (e) {
      // console.log(e.currentTarget.dataset.index)
      const currentIndex = e.currentTarget.dataset.index
      const scrollTop = 0
      this.triggerEvent('handleCateIndex', {currentIndex,scrollTop})
      this.setData({
        currentIndex
      })
    }
  }
})