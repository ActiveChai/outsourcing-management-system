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
              wx.reLaunch({
                url: '../publisher-info/publisher-info',
              })
            } else {
              wx.reLaunch({
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
              wx.reLaunch({
                url: '../publisher-info/publisher-info',
              })
            } else {
              wx.reLaunch({
                url: '../receiver-info/receiver-info',
              })
            }
          },
          fail: res => {
            wx.showToast({
              title: '修改失败',
              icon: 'none'
            })
          }
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
  }
})