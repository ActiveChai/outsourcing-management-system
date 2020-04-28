// pages/bidders/bidders.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bidders: [],
    dialogShow: false,
    userId: '',
    projectId: '',
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
  },
  selectBidder(e) {
    const {
      userId
    } = e.currentTarget.dataset
    this.setData({
      dialogShow: true,
      userId
    })
  },
  tapDialogButton(e) {
    const {
      index
    } = e.detail
    if (index) {
      wx.request({
        url: app.globalData.domain + '/selectBidder',
        method: 'POST',
        data: {
          userId: this.data.userId,
          projectId: this.data.projectId
        },
        success: res => {
          this.setData({
            dialogShow: false
          })
          wx.showToast({
            title: '已确定'
          })
          wx.navigateBack({})
        },
        fail: res => {}
      })
    } else {
      this.setData({
        dialogShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      projectId
    } = options
    this.setData({
      projectId
    })
    wx.request({
      url: app.globalData.domain + '/getBidders',
      method: 'GET',
      data: {
        projectId
      },
      success: res => {
        this.setData({
          bidders: res.data
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