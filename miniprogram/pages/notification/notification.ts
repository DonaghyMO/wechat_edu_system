// pages/notification/notification.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Notices:[]
    },
    deleteNotification(event){
        const notification_id = event.currentTarget.dataset.notification_id;
        const url = getApp().getDomainName()+"wechat/notification/delete";
        wx.request({
            url:url,
            method:"POST",
            data:{"delete_id":notification_id},
            success:(res)=>{
                wx.reLaunch({
                    url: '/pages/notification/notification'
                  });
                  
            },
            fail:(error)=>{
                console.log(error)
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
        var user_id = wx.getStorageSync("userInfo").userId;
        var user_type = wx.getStorageSync("userInfo").userType;
        var app = getApp()
        var url = app.getDomainName();
        url = url + "wechat/notification/wx_notification?user_id=" + user_id + "&user_type=" + user_type;
        wx.request({
            url: url,
            method: 'GET',
            success: (res) => {
                if (res.statusCode === 200) {
                    this.setData({
                        Notices: [...res.data],
                    })
                }
            },
            fail: (error) => {
                console.error("请求失败", error)
            }

        });
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