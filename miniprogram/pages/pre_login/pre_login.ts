// pages/pre_login/pre_login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_texts : {}
  },
  navigateToLogin(event){
    const user_type = event.currentTarget.dataset.user_type;
    wx.navigateTo({
        url:"/pages/login/login?user_type="+user_type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
        "page_texts":wx.getStorageSync("language_json").pre_login
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})