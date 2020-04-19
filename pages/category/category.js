// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [{
      text: "全部",
      isSelect: true
    }, {
      text: "微信开发"
    }, {
      text: "UI设计"
    }, {
      text: "网站开发"
    }, {
      text: "APP开发"
    }, {
      text: "桌面应用"
    }, {
      text: "管理系统"
    }, {
      text: "数据分析"
    }, {
      text: "智能硬件"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'http://127.0.0.1:3000/string',
      success(res) {
        console.log(res.data)
      },
      fail() {
        console.log(111)
      },
      complete() {
        console.log(222)
      }
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