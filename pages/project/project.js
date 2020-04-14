// pages/project/project.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [{
      src: "/images/wechat.png",
      text: "微信开发"
    }, {
      src: "/images/ui.png",
      text: "UI设计"
    }, {
      src: "/images/web.png",
      text: "网站开发"
    }, {
      src: "/images/app.png",
      text: "APP开发"
    }, {
      src: "/images/desktop.png",
      text: "桌面应用"
    }, {
      src: "/images/system.png",
      text: "管理系统"
    }, {
      src: "/images/data.png",
      text: "数据分析"
    }, {
      src: "/images/hardware.png",
      text: "智能硬件"
    }],
    list: [{
      "text": "项目",
      "iconPath": "/images/tabbar_icon_project_default.png",
      "selectedIconPath": "/images/tabbar_icon_project_active.png"
    }, {
      "text": "我的",
      "iconPath": "/images/tabbar_icon_me_default.png",
      "selectedIconPath": "/images/tabbar_icon_me_active.png"
    }]
  },
  search: function(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  selectResult: function(e) {
    console.log('select result', e.detail)
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
  onLoad: function(options) {
    this.setData({
      search: this.search.bind(this)
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