Component({
  data: {},
  properties: {},
  methods: {
    // 点击返回顶部
    handleBackTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 800
      });
    }

  }
})