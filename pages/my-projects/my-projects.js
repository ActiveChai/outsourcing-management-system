// pages/my-projects/my-projects.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    projects: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const thirdSession = wx.getStorageSync('thirdSession')
    const accountIdentity = wx.getStorageSync('accountIdentity')
    if (accountIdentity === '0') {
      wx.request({
        url: app.globalData.domain + '/myPost',
        method: 'GET',
        data: {
          thirdSession
        },
        success: res => {
          this.setData({
            projects: res.data,
            accountIdentity
          })
        },
        fail: res => {
          wx.showToast({
            title: '获取失败'
          })
        }
      })
    } else {
      wx.request({
        url: app.globalData.domain + '/myBid',
        method: 'GET',
        data: {
          thirdSession
        },
        success: res => {
          this.setData({
            projects: res.data,
            accountIdentity
          })
        },
        fail: res => {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
        }
      })
    }
  }
})