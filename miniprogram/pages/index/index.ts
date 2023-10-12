// index.ts
// 获取应用实例
// pages/search/search.js

Page({
    data:{
        notices:[],
        page_texts:{},
        searchKeyword: '', // 用于存储搜索关键词
    },
    globalData:{
        openId:"",

    },

    navigateToResource(param){
        const dataset = param.currentTarget.dataset;
        const resource_type =dataset.resource_type
        wx.navigateTo({
            url:"/pages/resource/resource?type="+resource_type,
        })
    },
    navigateToInteract(){
        wx.navigateTo({
            url:"/pages/interaction/interaction"
        })
    },
    navigateToNotification(){
        wx.navigateTo({
            url:"/pages/notification/notification"
        })
    },
    onLoad: function(){
        // 小程序第一次加载首页时全局设置一个请求拦截器
        
    },
    onShow: function(){
        this.setData({
            page_texts:wx.getStorageSync("language_json").index
        })
        var user_id = wx.getStorageSync("userInfo").userId;
        var user_type = wx.getStorageSync("userInfo").userType;
        var app = getApp()
        var url = app.getDomainName();
        if(user_id===undefined||user_type===undefined){
            return
        }
        url = url +"wechat/notification/wx_notification?user_id="+user_id+"&user_type="+user_type;
        wx.request({
            url: url,
            method:'GET',
            success:(res) =>{
            
                if(res.statusCode === 200){
                    this.setData({
                        notices:[...res.data]
                    })
                    
                }
            },
            fail:(error) =>{
                console.error("请求失败",error)
            }
            
        });
    },
   
});
