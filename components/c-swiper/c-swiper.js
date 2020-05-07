Component({
  data: {},
  properties: {
    swiperlist: {
      type: Array,
      value: []
    }
  },
  externalClasses: ['swiper-container', 'swiper-img'],

  options: {
    multipleSlots: true
  },

  methods: {
    // 点击预览大图
    handleChooseImage(e) {
      const currentUrl = e.currentTarget.dataset.url
      this.triggerEvent('ChooseImage', { currentUrl })

    }
  }
})