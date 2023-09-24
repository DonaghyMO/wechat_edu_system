// pages/interaction/interaction.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers:[]
  },
  interactTeacher(param){
    const teacher_id =param.currentTarget.dataset.teacher_id;
    const student_id = wx.getStorageSync("userInfo").userId
    wx.navigateTo({
        url:"/pages/chatroom/chatroom?teacher_id="+teacher_id+"&student_id="+student_id
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
    wx.request({
        url:getApp().getDomainName()+"wechat/get_teacher_list",
        method:"GET",
        success:(res)=>{
            this.setData({
                teachers:[...res.data],
            })
        }
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