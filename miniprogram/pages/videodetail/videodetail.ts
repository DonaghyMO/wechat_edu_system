// pages/videodetail/videodetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:"",
    description:"",
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var resource_id = options.resource_id;
    var url = getApp().getDomainName()+"wechat/resource_detail?resource_type=video&resource_id="+resource_id;
    wx.request({
        url:url,
        method:"GET",
        success:(res)=>{
            var url = getApp().getDomainName()+res.data.url;
            var description = res.data.description;
            var title = res.data.title;
            this.setData({
                "videoUrl": url,
                "description":description,
                "title":title
        })
        },
    fail:(res)=>{
        console.log(res)
    },
    
    })
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