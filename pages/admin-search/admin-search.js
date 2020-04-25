// pages/admin-search/admin-search.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchCategoryIndex: '0',
    value: '',
    projects: [],
    users: []
  },
  viewUserInfo(e) {
    const {
      userId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../user-info/user-info?userId=' + userId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      searchCategoryIndex,
      value
    } = options
    this.setData({
      searchCategoryIndex,
      value
    })
    if (searchCategoryIndex === '0') {
      wx.request({
        url: app.globalData.domain + '/searchProjects',
        method: 'POST',
        data: {
          value
        },
        success: res => {
          this.setData({
            projects: res.data
          })
        },
        fail: res => {}
      })
    } else {
      wx.request({
        url: app.globalData.domain + '/searchUsers',
        method: 'POST',
        data: {
          value
        },
        success: res => {
          this.setData({
            users: res.data
          })
        },
        fail: res => {}
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