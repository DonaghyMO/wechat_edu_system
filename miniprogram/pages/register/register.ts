// pages/register/register.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userAvatarUrl: "",
        userNickName: "",
        password: "",
        confirmPassword: "",
        username: "",
        inviteCode: ""
    },
    inputUsername: function (e) {
        this.setData({
            username: e.detail.value
        });
    },
    inputPassword: function (e) {
        this.setData({
            password: e.detail.value
        });
    },
    inputConfirmPassword: function (e) {
        this.setData({
            confirmPassword: e.detail.value
        });
    },
    inputInviteCode: function (e) {
        this.setData({
            inviteCode: e.detail.value
        })
    },
    register() {
        const password = this.data.password;
        const confirmPassword = this.data.confirmPassword;
        if (password.localeCompare(confirmPassword) != 0) {
            wx.showToast({
                title: '两次密码不同',
                icon: 'none'
            });
        } else {
            wx.login({
                success: res => {
                    if (res.code) {
                        var code = res.code
                        wx.request({
                            url: getApp().getDomainName() + "wechat/register",
                            method: "POST",
                            data: {
                                "username": this.data.username,
                                "password": this.data.password,
                                "wechat_name": wx.getStorageSync("nickName"),
                                "invite_code": this.data.inviteCode,
                                "code": code,
                                "avata_url": wx.getStorageSync("userAvatarUrl")
                            },
                            success: res => {
                                wx.showToast({
                                    title: res.data.message,
                                    icon:'none'
                                })               
                            },
                            fail: err => {
                                console.error(err);
                                wx.showToast({
                                    title: '注册失败:'+err,
                                    icon:'none'
                                })
                            }
                        })
                    }
                },
            })

        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const pageUrl = wx.getStorageSync("userAvatarUrl")
        const userName = wx.getStorageSync("nickName")
        console.log(userName)
        this.setData({
            userAvatarUrl: pageUrl,
            userNickName: userName
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