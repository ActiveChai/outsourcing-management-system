// pages/project/project.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    projects: [],
    category: [{
      src: "/images/wechat.png",
      text: "微信开发",
      id: 1
    }, {
      src: "/images/ui.png",
      text: "UI设计",
      id: 2
    }, {
      src: "/images/web.png",
      text: "网站开发",
      id: 3
    }, {
      src: "/images/app.png",
      text: "APP开发",
      id: 4
    }, {
      src: "/images/desktop.png",
      text: "桌面应用",
      id: 5
    }, {
      src: "/images/system.png",
      text: "管理系统",
      id: 6
    }, {
      src: "/images/data.png",
      text: "数据分析",
      id: 7
    }, {
      src: "/images/hardware.png",
      text: "智能硬件",
      id: 8
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
  toCategory(e) {
    const {
      categoryId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../category/category?categoryId=' + categoryId
    })
  },
  search(value) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.domain + '/searchProjects',
        method: 'POST',
        data: {
          value
        },
        success: res => {
          resolve(res.data)
        },
        fail: res => {}
      })
    })
  },
  selectResult(e) {
    const {
      projectId
    } = e.detail.item
    wx.navigateTo({
      url: '../project-detail/project-detail?projectId=' + projectId
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
  onLoad: function(options) {
    this.setData({
      search: this.search.bind(this)
    })
    wx.request({
      url: app.globalData.domain + '/getAllProjects',
      method: 'GET',
      success: res => {
        this.setData({
          projects: res.data
        })
      },
      fail: res => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
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