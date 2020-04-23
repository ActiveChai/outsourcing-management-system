// pages/receiver-info/receiver-info.js

//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list: [{
        "text": "项目",
        "iconPath": "/images/tabbar_icon_project_default.png",
        "selectedIconPath": "/images/tabbar_icon_project_active.png"
      },
      {
        "text": "我的",
        "iconPath": "/images/tabbar_icon_me_default.png",
        "selectedIconPath": "/images/tabbar_icon_me_active.png"
      }
    ]
  },
  modifyInfo() {},
  myBid() {
    wx.navigateTo({
      url: '../my-bid/my-bid',
    })
  },
  switchIdentity() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  tabChange(e) {
    const {
      detail
    } = e
    if (detail.index === 0) {
      wx.redirectTo({
        url: '../project/project',
      })
    } else {
      wx.redirectTo({
        url: '../receiver-info/receiver-info',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
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
    wx.hideHomeButton()
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