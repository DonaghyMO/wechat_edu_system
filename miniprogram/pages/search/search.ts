// pages/search/search.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resourceList : [] 
    },
    resourceDetail(event){
        const dataset = event.currentTarget.dataset;
        const resource_type = dataset.resource_type;
        const resource_id = dataset.resource_id;
        if (resource_type == "video"){
            var url = "/pages/videodetail/videodetail?resource_id="+resource_id;
        }else if (resource_type == "text"){
            var url = "/pages/textdetail/textdetail?resource_id="+resource_id;
        }else{
            var url = "/pages/audiodetail/audiodetail?resource_id="+resource_id;
        }
        wx.navigateTo({
            url:url,
        })
    },
    // 输入框输入事件处理函数
    onInput: function (e) {
        var data =e.detail.value;
        this.setData({
            searchKeyword: data,
        });
    },
    // 输入框确认搜索事件处理函数
    onConfirm: function (e) {
        this.performSearch();
    },

    // 搜索按钮点击事件处理函数
    onSearch: function () {
        this.performSearch();
    },
    onPullDownRefresh() {
        // 获取信息的操作
        // 完成后调用 wx.stopPullDownRefresh() 来停止刷新动画
        wx.stopPullDownRefresh();
    },
    // 执行搜索操作的函数，根据需要自定义
    performSearch: function () {
        var keyword = this.data.searchKeyword;
        if(keyword === undefined){
            keyword=''
        }
        if (keyword.trim() === '') {
            wx.showToast({
                title: '请输入关键词',
                icon: 'none',
            });
        } else {
            // 在这里执行实际的搜索操作，例如跳转到搜索结果页面
            wx.request({
                url:getApp().getDomainName()+"wechat/wc_search_resource?keyword="+keyword,
                method:"GET",
                success:(res)=>{
                    let data = res.data.resource_list;
                    if ( data.length > 0){
                        this.setData({
                            resourceList:res.data.resource_list
                        })
                    }
                },
                fail:(error)=>{
                    console.log(error)
                },
            })
        }
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