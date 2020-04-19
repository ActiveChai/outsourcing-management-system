// pages/publisher/publisher.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    isAgree: false,
    formData: {},
    rules: [{
      name: 'title',
      rules: {
        required: true,
        message: '请输入项目标题'
      },
    }, {
      name: 'description',
      rules: {
        required: true,
        message: '请输入描述文本'
      }
    }, {
      name: 'budget',
      rules: {
        required: true,
        message: '请输入项目预算'
      }
    }, {
      name: 'expect',
      rules: {
        required: true,
        message: '请输入预期开发时间'
      }
    }],
    categories: ["请选择", "网站开发", "桌面应用", "App", "UI设计", "数据采集与分析", "嵌入式与智能硬件", "微信开发", "管理系统", "其它分类项目"],
    categoryIndex: '0',
    list: [{
        "text": "发布",
        "iconPath": "/images/tabbar_icon_publish_default.png",
        "selectedIconPath": "/images/tabbar_icon_publish_active.png"
      },
      {
        "text": "我的",
        "iconPath": "/images/tabbar_icon_me_default.png",
        "selectedIconPath": "/images/tabbar_icon_me_active.png"
      }
    ]
  },
  //事件处理函数
  bindCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindAgreeChange(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  publish() {
    const publishTime = +new Date()
    const {
      publisher
    } = app.globalData.userInfo
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else if (this.data.categoryIndex === '0') {
        this.setData({
          error: '请选择项目分类'
        })
      } else if (!this.data.isAgree) {
        this.setData({
          error: '请阅读并同意《相关条款》'
        })
      } else {
        // const publishTime = new Data()
        // console.log(publishTime)
        wx.request({
          url: app.globalData.domain + '/publish',
          method: 'POST',
          data: {
            ...this.data.formData,
            category: this.data.categories[this.data.categoryIndex],
            publishTime,
            publisher
          },
          success: res => {
            wx.showToast({
              title: '发布成功'
            })
            wx.navigateTo({
              url: '../myPost/myPost',
            })
          },
          fail: res => {
            wx.showToast({
              title: '发布失败'
            })
          }
        })
      }
    })
  },
  tabChange(e) {
    const {
      detail
    } = e
    if (detail.index === 0) {
      wx.redirectTo({
        url: '../publish/publish',
      })
    } else {
      wx.redirectTo({
        url: '../publisher-info/publisher-info',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo)
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