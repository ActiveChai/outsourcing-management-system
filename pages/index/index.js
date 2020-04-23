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
    userInfo: null
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
        wx.setStorageSync('accountIdentity', '2')
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

  },
  getUserInfo: function(e) {
    this.setData({
      // 授权标记，确定是否跳转
      userInfo: e.detail.userInfo
    })
    if (!this.data.userInfo) {
      return
    }
    const thirdSession = wx.getStorageSync('thirdSession')
    wx.request({
      url: app.globalData.domain + '/userLogin',
      method: 'POST',
      data: {
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        thirdSession
      },
      success: res => {
        wx.setStorageSync('userInfo', res.data)
      },
      fail: res => {
        console.log(res.errMsg)
      }
    })
    if (this.data.accountIndex === '0') {
      wx.setStorageSync('accountIdentity', '0')
      wx.redirectTo({
        url: '../publish/publish'
      })
    } else {
      wx.setStorageSync('accountIdentity', '1')
      wx.redirectTo({
        url: '../project/project'
      })
    }
  }
})