// pages/language/language.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navigateToPreLogin(event){
    const language = event.currentTarget.dataset.language;
    wx.setStorageSync('language', language);
    wx.request({
        url: getApp().getDomainName()+"resource/download/language/"+language+".json",
        success: res => {
            const data = res.data;
            console.log(data)
            wx.setStorageSync('language_json',data);
            wx.navigateTo({
                url:"/pages/pre_login/pre_login",
            })
        },
        fail:err=>{
            console.error(err)
        }
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