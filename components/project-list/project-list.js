// components/project-list/project-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    projects: Array
  },
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    viewProjectDetail(e) {
      const {
        projectId
      } = e.currentTarget.dataset
      wx.navigateTo({
        url: '../project-detail/project-detail?projectId=' + projectId
      })
    }
  }
})