Page({

    /**
     * 页面的初始数据
     */
    data: {
        page_texts:{},
        chatContents: [],
        meType: 1,
        message: "",
        messages: [],
        scrollIntoView: '',
        chatId: 1,
        inputMessage: '',
    },
    onInput: function (e) {
        this.setData({
            inputMessage: e.detail.value,
        });
    },
    sendMessage: function () {
        if (this.data.inputMessage == "") {
            return
        }
        const message = {
            id: new Date().getTime(),
            user_id: wx.getStorageSync("userInfo").userId,
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
        wx.sendSocketMessage({
            data: JSON.stringify({
                "message": message,
            }),
            success: function (res) {
                console.log('消息发送成功:', message);
            },
            fail: function (res) {
                console.error('消息发送失败:', res);
            }
        })
    },
    initWebSocket: function () {

        wx.onSocketOpen(function (res) {
            console.log('WebSocket 连接已打开');
        });

        wx.onSocketClose(function (err) {
            console.log('WebSocket 连接已断开' + err);
        })

        // 监听 WebSocket 收到消息事件
        wx.onSocketMessage((res) => {
            const data = JSON.parse(res.data)
            if (data.user_type === this.data.meType){
                return
            }
            const messages = this.data.messages.concat(data);
            
            this.setData({
                messages: messages,
                scrollIntoView: `message_${data.id}`
            });
            
            
        })
  
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function (options) {
        this.setData({
            page_texts:wx.getStorageSync("language_json").chatroom
        })
        let student_id = options.student_id;
        let teacher_id = options.teacher_id;
        let room_id = teacher_id + "_" + student_id;

        // http方式获取历史聊天记录
        wx.request({
            url: getApp().getDomainName() + "chat/get_chat_logs/" + room_id + "/",
            method: "GET",
            success: res => {
                let data = res.data.content;
                var scroll_id;
                if (data.length > 0) {
                    scroll_id = `message_${data[data.length - 1].id}`;
                } else {
                    scroll_id = `message_1`
                }
                this.setData({
                    messages: data,
                    scrollIntoView: scroll_id,
                    meType: wx.getStorageSync('userInfo').userType
                })
                // 获取websocket
                let ws_url = getApp().getWebSocketName() + room_id + "/";
                wx.connectSocket({
                    url: ws_url,
                });
                this.initWebSocket()
            },
            fail: err => {
                console.error(err)
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
        wx.closeSocket({
            success: function (res) {
                console.log('WebSocket 连接已关闭');
            },
            fail: function (res) {
                console.error('关闭 WebSocket 连接失败:', res);
            }
        });
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

    getWebSocket() {

    }
})