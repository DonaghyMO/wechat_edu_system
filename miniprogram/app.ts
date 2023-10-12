// app.ts
App<IAppOption>({
  globalData: {},
    getDomainName(){
    const app=getApp();
    app.globalData.domain = "https://run.yuanchuangyuan.cn/";
    return app.globalData.domain;
},
    getWebSocketName(){
        const app=getApp();
        app.globalData.wsUrl = "wss://run.yuanchuangyuan.cn/ws/chat/";
    return app.globalData.wsUrl;
    },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  onShow(){
      const userInfo = wx.getStorageSync("userInfo");
      if (!userInfo){
          wx.reLaunch({
              url: '/pages/language/language'
          })
      }
  }
  
})