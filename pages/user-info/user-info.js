// pages/user-info/user-info.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    publishProjects: [],
    bidProjects: [],
    showPublish: false,
    showBid: false,
    emptyPublish: false,
    emptyBid: false
  },
  bindShowPublish() {
    this.setData({
      showPublish: !this.data.showPublish
    })
  },
  bindShowBid() {
    this.setData({
      showBid: !this.data.showBid
    })
  },
  deleteUser() {
    wx.request({
      url: app.globalData.domain + '/deleteUser',
      method: 'POST',
      data: {
        userId: this.data.userId
      },
      success: res => {
        wx.showToast({
          title: '删除成功'
        })
        wx.navigateBack({})
      },
      fail: res => {
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      userId
    } = options
    this.setData({
      userId
    })
    wx.request({
      url: app.globalData.domain + '/getUserDetail',
      method: 'GET',
      data: {
        userId
      },
      success: res => {
        const {
          publishProjects,
          bidProjects
        } = res.data
        this.setData({
          publishProjects,
          bidProjects,
          emptyPublish: publishProjects.length === 0,
          emptyBid: bidProjects.length === 0
        })
      },
      fail: res => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    })
  }
})