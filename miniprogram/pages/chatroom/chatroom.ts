Page({

    /**
     * 页面的初始数据
     */
    data: {
        chatContents: [],
        meId: 1,
        message: "",
        messages: [],
        scrollIntoView: '',
        chatId:1,
        inputMessage: '',
    },
    onInput: function (e) {
        this.setData({
            inputMessage: e.detail.value, 
        });
    },
    sendMessage: function () {
        if (this.data.inputMessage == ""){
            return
        }
        const message = {
            id: new Date().getTime(),
            user_id : wx.getStorageSync("userInfo").userId,
            user_type: wx.getStorageSync("userInfo").userType,
            content: this.data.inputMessage,
        };
        const messages = this.data.messages;
        messages.push(message);
        this.setData({
            messages: messages,
            inputMessage: '',
            scrollIntoView: `message_${message.id}`,
        });
        console.log(this.data.messages)
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function (options) {
        let student_id = options.student_id
        let teacher_id = options.teacher_id
        let url = getApp().getDomainName() + "wechat/get_chat_content?teacher_id=" + teacher_id + "&student_id=" + student_id;
        wx.request({
            url: url,
            method: "GET",
            success: (res) => {
                this.setData({
                    chatContents: res.data.content,
                    meId: wx.getStorageSync("userInfo").userId,
                    chatId: res.data.id,
                })
            },
            fail: (error) => {
                console.log(error)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
        console.log(this.data.messages)
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