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
  modifyInfo() {
    wx.navigateTo({
      url: '../modify-info/modify-info'
    })
  },
  myProjects() {
    wx.navigateTo({
      url: '../my-projects/my-projects'
    })
  },
  switchIdentity() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  tabChange(e) {
    const {
      detail
    } = e
    if (detail.index === 0) {
      wx.redirectTo({
        url: '../project/project'
      })
    } else {
      wx.redirectTo({
        url: '../receiver-info/receiver-info'
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideHomeButton()
  }
})