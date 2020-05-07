// wx.getSetting 的 promise 形式
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

// wx.openSetting 的 promise 形式
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

// wx.chooseAddress 的 promise 形式
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

// wx.showModal 的 promise 形式
export const showModal = (options) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...options,
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}


// wx.showToast 的 promise 形式
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}


// wx.login 的 promise 形式
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      time: 10000,
      success: (res)=>{
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

// wx.requestPayment 的 promise 形式
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
      
  })
}