// pages/admin-page/admin-page.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchCategory: ["项目", "用户"],
    searchCategoryIndex: '0',
    rules: [{
      name: 'value',
      rules: {
        required: true,
        message: '请输入搜索关键词'
      },
    }],
    formData: {},
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
  //事件处理函数
  bindSearchCategoryChange: function(e) {
    this.setData({
      searchCategoryIndex: e.detail.value
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
  search() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        wx.navigateTo({
          url: '../admin-search/admin-search?searchCategoryIndex=' + this.data.searchCategoryIndex + '&value=' + this.data.formData.value
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
        url: '../admin-page/admin-page',
      })
    } else {
      wx.redirectTo({
        url: '../admin-info/admin-info',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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