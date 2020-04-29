// pages/progress/progress.js
const formatTime = require('../../utils/format-time.js')
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    progress: [],
    accountIdentity: '0',
    projectStatus: 0,
    projectId: '',
    evaluation: '',
    evaluationList: [],
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    evaluateShow: false
  },
  startDev() {
    wx.request({
      url: app.globalData.domain + '/startDev',
      method: 'POST',
      data: {
        projectId: this.data.projectId
      },
      success: res => {
        wx.showToast({
          title: '开始开发'
        })
        this.onLoad({
          projectId: this.data.projectId
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
  endDev() {
    wx.request({
      url: app.globalData.domain + '/endDev',
      method: 'POST',
      data: {
        projectId: this.data.projectId
      },
      success: res => {
        wx.showToast({
          title: '开发完成'
        })
        this.onLoad({
          projectId: this.data.projectId
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
  acceptProject() {
    wx.request({
      url: app.globalData.domain + '/acceptProject',
      method: 'POST',
      data: {
        projectId: this.data.projectId
      },
      success: res => {
        wx.showToast({
          title: '验收成功'
        })
        this.onLoad({
          projectId: this.data.projectId
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
  formInputChange(e) {
    this.setData({
      evaluation: e.detail.value
    })
  },
  evaluate() {
    this.setData({
      evaluateShow: true
    })
  },
  evaluateButton(e) {
    const {
      index
    } = e.detail
    if (index) {
      if (!this.data.evaluation) {
        this.setData({
          error: '请输入评价内容'
        })
        return
      }
      const userInfo = wx.getStorageSync('userInfo')
      wx.request({
        url: app.globalData.domain + '/evaluate',
        method: 'POST',
        data: {
          projectId: this.data.projectId,
          evaluation: userInfo.nickName + '：' + this.data.evaluation
        },
        success: res => {
          this.setData({
            evaluateShow: false,
            evaluation: ''
          })
          wx.showToast({
            title: '评价成功'
          })
          this.onLoad({
            projectId: this.data.projectId
          })
        },
        fail: res => {
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          })
        }
      })
    } else {
      this.setData({
        evaluateShow: false
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
    const accountIdentity = wx.getStorageSync('accountIdentity')
    const thirdSession = wx.getStorageSync('thirdSession')
    this.setData({
      accountIdentity,
      projectId
    })
    wx.request({
      url: app.globalData.domain + '/getProjectDetail',
      method: 'GET',
      data: {
        projectId,
        thirdSession
      },
      success: res => {
        const {
          projectStatus,
          progress,
          evaluationList
        } = res.data
        const formatProgress = progress.map(item => {
          return {
            ...item,
            time: formatTime(item.time)
          }
        })
        this.setData({
          projectStatus,
          progress: formatProgress,
          evaluationList
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