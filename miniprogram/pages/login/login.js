// pages/login/login.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userAvatarUrl: '', // 初始化为空
    },
    login(event) {
        const dataset = event.currentTarget.dataset;
        const userType = dataset.usertype;
        wx.login({
            success: function (res) {
                if (res.code) {
                    var code = res.code
                    wx.getUserInfo({
                        success: (userInforRes) => {
                            var userInfo = userInforRes.userInfo;
                            var nickName = userInfo.nickName;
                            var url = getApp().getDomainName() + "wechat/login"
                            wx.request({
                                url: url,
                                method: "POST",
                                data: {
                                    "code": code,
                                    'user_type': userType,
                                    "nick_name": nickName,
                                    "user_info": userInfo,
                                },
                                header: {
                                    "content-type": "application/json;charset=UTF-8"
                                },
                                success: function (res) {
                                    // 请求成功时的回调函数
                                    var user_id = res.data.user_id;
                                    var user_type = res.data.user_type;
                                    var openid = res.data.openid;
                                    wx.setStorageSync(
                                        'userInfo', {
                                        "userId": user_id,
                                        "userType": user_type,
                                    });
                                    wx.setStorageSync('openid', openid)
                                    var data = wx.getStorageSync('userInfo');
                                    wx.switchTab({
                                        url: '/pages/index/index' // 将要跳转的TabBar页的路径
                                    });
                                },
                                fail: function (err) {
                                    // 请求失败时的回调函数
                                    console.error('请求失败:', err);
                                }
                            })
                        },

                    })
                } else {
                    console.log("登录失败", res.errMsg)
                }
            },
            fail: function (error) {
                console.error('登录失败', error);
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.getUserInfo({
            success:res=>{
                const userInfo = res.userInfo;
                {nickName, avatarUrl}=userInfo;
                console.log("用户信息：",userInfo)
            },
            fail:err=>{
                console.error("获取用户信息失败：",err)
            }
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