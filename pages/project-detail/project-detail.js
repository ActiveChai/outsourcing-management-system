// pages/project-detail/project-detail.js
//获取应用实例
const app = getApp()
const formatTime = require('../../utils/format-time.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    project: null,
    formatPublishTime: '',
    accountIdentity: '',
    projectStatus: 0
  },
  endBid() {
    const {
      projectId
    } = this.data.project
    wx.request({
      url: app.globalData.domain + '/endBid',
      method: 'POST',
      data: {
        projectId
      },
      success: res => {
        this.setData({
          projectStatus: 1
        })
      },
      fail: res => {}
    })
  },
  cancelPublish() {
    const {
      projectId
    } = this.data.project
    wx.request({
      url: app.globalData.domain + '/cancelPublish',
      method: 'POST',
      data: {
        projectId
      },
      success: res => {
        console.log(res.data)
      },
      fail: res => {}
    })
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const accountIdentity = wx.getStorageSync('accountIdentity')
    this.setData({
      accountIdentity
    })
    const {
      projectId
    } = options
    wx.request({
      url: app.globalData.domain + '/getProjectDetail',
      method: 'GET',
      data: {
        projectId
      },
      success: res => {
        this.setData({
          project: res.data,
          projectStatus: res.data.projectStatus,
          formatPublishTime: formatTime(res.data.publishTime)
        })
      },
      fail: res => {}
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