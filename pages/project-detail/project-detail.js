// pages/project-detail/project-detail.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    project: {
      name: '智慧社区管理系统',
      due: '2',
      publisher: 'agfdhh',
      publishTime: '4',
      category: '管理系统',
      budget: '6',
      expect: '7',
      content: '综合的社区管理系统，含有物业端及业主端，商户端且都支持网页版和移动版',
      bidderNum: '8'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      projectId
    } = options
    wx.request({
      url: app.globalData.domain + '/getprojectDetail',
      method: 'GET',
      data: {
        projectId
      },
      success: res => {
        this.setData({
          project: res.data
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