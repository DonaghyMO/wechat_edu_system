// pages/interaction/interaction.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
  },
  interactUser(param){
    const user_type = wx.getStorageSync("userInfo").userType;
    const user_id =param.currentTarget.dataset.user_id;
    var student_id;
    var teacher_id;
    if(user_type==="teacher"){
        student_id=user_id;
        teacher_id=wx.getStorageSync("userInfo").userId;
    }else{
        teacher_id=user_id;
        student_id=wx.getStorageSync("userInfo").userId;
    }
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
    let user_type = wx.getStorageSync("userInfo").userType
    wx.request({
        url:getApp().getDomainName()+"wechat/get_chat_list?user_type="+user_type,
        method:"GET",
        success:(res)=>{
            this.setData({
                users:[...res.data],
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