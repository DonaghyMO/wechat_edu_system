// pages/login/login.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userAvatarUrl: '', // 初始化为空
        userNickname:'',//用户昵称
        userType:"",
        username:"",
        password:"",
        page_texts:{}
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
    login() {
        wx.request({
            url:getApp().getDomainName()+"wechat/login",
            method:"POST",
            data:{
                "user_type":this.data.userType,
                "password":this.data.password,
                "username":this.data.username,
            },
            success: res=>{

                if(res.data.status != "success"){
                    wx.showToast({
                        title:res.data.message,
                        icon:'none'
                    })
                    return
                }
                const openid = res.data.openid;
                const userId = res.data.user_id
                wx.setStorageSync(
                    "userInfo",{
                        "username":this.data.username,
                        "userType":this.data.userType,
                        "userId":userId,
                        "openid": openid,
                        'userAvatarUrl':this.data.userAvatarUrl,
                        "nickName":this.data.userNickname
                    }
                );
                wx.switchTab({
                    url:"/pages/index/index"
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
    onLoad: function (options) {
        this.setData({
            page_texts:wx.getStorageSync("language_json").login
        })
        console.log(wx.getStorageSync("language_json").login)
        const user_type = options.user_type
        // 获取用户信息
        wx.getUserInfo({
            success: res => {
            const userInfo = res.userInfo;
            const { nickName, avatarUrl } = userInfo;
            wx.setStorageSync(
                'userAvatarUrl',avatarUrl
            )
            wx.setStorageSync(
                'nickName',nickName
            )

            // 在这里可以使用用户信息，例如显示用户头像和昵称
            this.setData({
                userAvatarUrl:avatarUrl,
                userNickname: nickName,
                userType:user_type
            })
          },
          fail: err => {
            // 如果用户未授权获取用户信息或其他原因导致失败，可以处理错误
            console.error("获取用户信息失败：", err);
          }
        });
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