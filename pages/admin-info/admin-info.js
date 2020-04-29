// pages/admin-info/admin-info.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        "text": "概况",
        "iconPath": "/images/tabbar_icon_overview_default.png",
        "selectedIconPath": "/images/tabbar_icon_overview_active.png"
      },
      {
        "text": "我的",
        "iconPath": "/images/tabbar_icon_me_default.png",
        "selectedIconPath": "/images/tabbar_icon_me_active.png"
      }
    ]
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
        url: '../admin-page/admin-page',
      })
    } else {
      wx.redirectTo({
        url: '../admin-info/admin-info',
      })
    }
  }
})