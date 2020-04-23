// pages/modify-info/modify-info.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    formData: null,
    tempFilePaths: []
  },
  uplaodFile(files) {
    // 文件上传的函数，返回一个promise
    this.setData({
      tempFilePaths: files.tempFilePaths
    })
    return new Promise((resolve, reject) => {
      resolve({
        urls: files.tempFilePaths
      })
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  modifyInfo() {
    this.selectComponent('#form').validate((valid, errors) => {
      const thirdSession = wx.getStorageSync('thirdSession')
      if (this.data.tempFilePaths[0]) {
        wx.uploadFile({
          url: app.globalData.domain + '/imgModifyInfo',
          filePath: this.data.tempFilePaths[0],
          name: 'img',
          formData: {
            ...this.data.formData,
            thirdSession
          },
          success(res) {
            wx.setStorageSync('userInfo', JSON.parse(res.data))
            const accountIdentity = wx.getStorageSync('accountIdentity')
            if (accountIdentity === '0') {
              wx.redirectTo({
                url: '../publisher-info/publisher-info',
              })
            } else {
              wx.redirectTo({
                url: '../receiver-info/receiver-info',
              })
            }
          },
          fail(res) {
            console.log(res)
          }
        })
      } else {
        wx.request({
          url: app.globalData.domain + '/modifyInfo',
          method: 'POST',
          data: {
            ...this.data.formData,
            thirdSession
          },
          success: res => {
            wx.setStorageSync('userInfo', res.data)
            const accountIdentity = wx.getStorageSync('accountIdentity')
            if (accountIdentity === '0') {
              wx.navigateTo({
                url: '../publisher-info/publisher-info',
              })
            } else {
              wx.navigateTo({
                url: '../receiver-info/receiver-info',
              })
            }
          },
          fail: res => {}
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})