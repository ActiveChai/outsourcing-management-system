// pages/category/category.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [{
      text: '全部',
      id: 0
    }, {
      text: '微信开发',
      id: 1
    }, {
      text: 'UI设计',
      id: 2
    }, {
      text: '网站开发',
      id: 3
    }, {
      text: 'APP开发',
      id: 4
    }, {
      text: '桌面应用',
      id: 5
    }, {
      text: '管理系统',
      id: 6
    }, {
      text: '数据分析',
      id: 7
    }, {
      text: '智能硬件',
      id: 8
    }, {
      text: '其它',
      id: 9
    }],
    projects: [],
    currentCategory: '全部',
    scrollLeft: 0
  },
  switchTab(e) {
    const {
      categoryId
    } = e.currentTarget.dataset
    this.getCategoryProjects(categoryId)
  },
  viewProjectDetail(e) {
    const {
      projectId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../project-detail/project-detail?projectId=' + projectId,
    })
  },
  getCategoryProjects(categoryId) {
    let {
      category
    } = this.data
    category.forEach(item => {
      item.isSelect = false
    })
    category[categoryId].isSelect = true
    this.setData({
      category,
      currentCategory: category[categoryId].text,
      scrollLeft: categoryId * 64
    })
    wx.request({
      url: app.globalData.domain + '/getCategoryProjects',
      method: 'GET',
      data: {
        category: this.data.currentCategory
      },
      success: res => {
        this.setData({
          projects: res.data
        })
      },
      fail: res => {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      categoryId
    } = options
    this.getCategoryProjects(categoryId)
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