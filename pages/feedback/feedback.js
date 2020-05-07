Page({
  data: {
    tabList: ['体验问题', '商品、商家投诉', '其他'],
    // 选择的图片本地地址
    chooseImgs: [],
    // 文本域中的内容
    txtValue: '',
  },


  // 上传的图片链接
  uploadImgs: [],

  // 点击上传图片
  handleImgUpload() {
    wx.chooseImage({
      // 一次最多选择多少张图片
      count: 9,
      // 图片的格式，原图和压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源，相册和相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
      fail: () => { },
      complete: () => { }
    });

  },

  // 点击删除当前图片
  hanldeDeleteImg(e) {
    // 获取当前点击图片的索引
    const { index } = e.currentTarget.dataset
    console.log(index)

    // 获取当前的图片数组
    let { chooseImgs } = this.data

    // 从数组中删除当前图片
    chooseImgs.splice(index, 1)

    this.setData({
      chooseImgs
    })
  },

  // 当输入框的内容发生改变时
  handleInput(e) {
    // 获取输入的值
    const value = e.detail.value
    this.setData({
      txtValue: value
    })
  },

  // 点击提交时
  handleSubmit() {
    // 1. 获取文本域中的内容和图片数组
    const { txtValue, chooseImgs } = this.data

    // 2. 对内容进行校验
    if (!txtValue.trim()) {
      // 如果为空值，则直接返回
      wx.showToast({
        title: '不写东西你有🔨意见？',
        icon: 'none',
        mask: true
      });

      return
    }

    // 显示正在上传
    wx.showLoading({
      title: '上传中...',
      mask: true
    });

    if (chooseImgs.length != 0) {
      // 3. 准备上传图片，到专门的图片的服务器，返回图片外网的链接
      // uploadFile 不支持多个文件同时上传，需要遍历数组，挨个上传
      chooseImgs.forEach((item, index) => {

        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://images.ac.cn/api/upload/upload',
          // 被上传的文件的路径
          filePath: item,
          // 上传的文件的名称，后台来获取文件
          name: "image",
          // 顺带的文本信息
          formData: {
            apiType: 'SuNing',
            token: 'f4dac5eb40020f3af124cc13cc4d'
          },
          success: (result) => {
            // 返回的data数据是json格式的，需要解析后拿到url的值
            let url = JSON.parse(result.data).data.url.suning
            console.log(url)
            // 将链接存入新的数组中
            this.uploadImgs.push(url)

            // 所有的图片都上传完毕才触发
            if (index === chooseImgs.length - 1) {
              // 提交都成功
              console.log("图片上传成功，可以提交到后台")

              // 重置页面
              this.setData({
                txtValue: '',
                chooseImgs: []
              })

              // 关闭弹窗
              wx.hideLoading();

              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });

            }
          }
        });
      })
    }else{
      wx.hideLoading();
      console.log("只是上传了文本")
      wx.navigateBack({
        delta: 1
      });
    }


  }
})