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
        fail: res => {
          wx.showToast({
            title: '确定失败',
            icon: 'none'
          })
        }
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
      fail: res => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    })
  }
})