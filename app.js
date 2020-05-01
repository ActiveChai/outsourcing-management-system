//app.js
App({
  onLaunch: function() {
    const thirdSession = wx.getStorageSync('thirdSession')
    if (thirdSession) {
      wx.checkSession({
        success() {
          // session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          this.login() //重新登录
        }
      })
    } else {
      this.login() //重新登录
    }
  },
  login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.domain + '/getSession',
          method: 'POST',
          data: {
            code: res.code
          },
          success: res => {
            const {
              thirdSession
            } = res.data
            wx.setStorageSync('thirdSession', thirdSession)
          },
          fail: res => {
            console.log(res.errMsg)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: 'https://api.wechat.activechai.cn'
  }
})