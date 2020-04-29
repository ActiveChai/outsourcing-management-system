// pages/project-detail/project-detail.js
const formatTime = require('../../utils/format-time.js')
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    project: null,
    formatPublishTime: '',
    accountIdentity: '',
    projectStatus: 0,
    isBider: false,
    isPublisher: false,
    bidderNum: 0,
    isSelected: false,
    isSuccessBid: false,
    weChatCode: ''
  },
  endBid() {
    const {
      projectId
    } = this.data.project
    wx.request({
      url: app.globalData.domain + '/endBid',
      method: 'POST',
      data: {
        projectId
      },
      success: res => {
        this.setData({
          projectStatus: 1
        })
      },
      fail: res => {
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },
  cancelPublish() {
    const {
      projectId
    } = this.data.project
    wx.request({
      url: app.globalData.domain + '/cancelPublish',
      method: 'POST',
      data: {
        projectId
      },
      success: res => {
        wx.showToast({
          title: '删除成功'
        })
        if (this.data.accountIdentity === '2') {
          wx.navigateBack({})
        } else {
          wx.navigateTo({
            url: '../publish/publish'
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },
  bid() {
    if (this.data.isPublisher) {
      wx.showToast({
        title: '发布者不能参与竞标',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const {
      projectId
    } = this.data.project
    const thirdSession = wx.getStorageSync('thirdSession')
    wx.request({
      url: app.globalData.domain + '/bid',
      method: 'POST',
      data: {
        projectId,
        thirdSession
      },
      success: res => {
        wx.showToast({
          title: '参与竞标成功',
          duration: 2000
        })
        this.setData({
          isBider: true,
          bidderNum: this.data.bidderNum++
        })
      },
      fail: res => {
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },
  toSelectBidder() {
    const {
      projectId
    } = this.data.project
    wx.navigateTo({
      url: '../bidders/bidders?projectId=' + projectId
    })
  },
  viewProgress() {
    const {
      projectId
    } = this.data.project
    wx.navigateTo({
      url: '../progress/progress?projectId=' + projectId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      projectId
    } = options
    const accountIdentity = wx.getStorageSync('accountIdentity')
    this.setData({
      projectId,
      accountIdentity
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const thirdSession = wx.getStorageSync('thirdSession')
    wx.request({
      url: app.globalData.domain + '/getProjectDetail',
      method: 'GET',
      data: {
        projectId: this.data.projectId,
        thirdSession
      },
      success: res => {
        this.setData({
          project: res.data,
          projectStatus: res.data.projectStatus,
          formatPublishTime: formatTime(res.data.publishTime),
          isBider: res.data.people.isBider,
          isPublisher: res.data.people.isPublisher,
          isSuccessBid: res.data.people.isSuccessBid,
          bidderNum: res.data.bidderNum,
          weChatCode: res.data.weChatCode
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