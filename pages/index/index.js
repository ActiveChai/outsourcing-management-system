//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    accounts: ["发包者", "接包者", "管理员"],
    accountIndex: '0',
    rules: [{
      name: 'admin-account',
      rules: {
        required: true,
        message: '请输入账号'
      },
    }, {
      name: 'admin-password',
      rules: {
        required: true,
        message: '请输入密码'
      },
    }],
    formData: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindAccountChange: function(e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindCountryChange: function(e) {
    this.setData({
      countryIndex: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  adminLogin() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        wx.showToast({
          title: '登录成功'
        })
        wx.redirectTo({
          url: '../admin-page/admin-page'
        })
      }
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (this.data.accountIndex === '0') {
      wx.redirectTo({
        url: '../publish/publish'
      })
    } else {
      wx.redirectTo({
        url: '../project/project'
      })
    }
  }
})