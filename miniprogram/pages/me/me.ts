// pages/me/me.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        page_texts:{},
        notices: [],
        avatarUrl:"",
        username:"",
        userType:"",
        nickName:"",
        userType2Chinese:""
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
    onShow: function () {
        this.setData({
            page_texts:wx.getStorageSync("language_json").me
        })
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
                        notices: [...res.data]
                    })

                }
            },
            fail: (error) => {
                console.error("请求失败", error)
            }

        });
        // 修改用戶信息
        const userInfo = wx.getStorageSync("userInfo")
        var userType2Chinese = ""
        if(userInfo.userType==="teacher"){
            userType2Chinese = "教师";
        }else{
            userType2Chinese = "学生";
        }
        this.setData({
            avatarUrl:userInfo.userAvatarUrl,
            username:userInfo.username,
            userType:userInfo.userType,
            nickName:userInfo.nickName,
            userType2Chinese:userType2Chinese
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

    },
    clearStorage() {
        wx.clearStorage({
            success: function (res) {
              console.log('缓存数据清除成功');
            },
            fail: function (res) {
              console.error('缓存数据清除失败', res);
            }
        });
        wx.navigateTo({
            "url": "/pages/language/language"
        })
    },
})