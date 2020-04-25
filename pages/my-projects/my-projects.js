// pages/myPost/myPost.js
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