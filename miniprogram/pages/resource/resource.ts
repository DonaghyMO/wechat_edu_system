Page({
    data: {
        page_texts:{},
      resourceList: [], // 资源列表数据
       resourceType:""
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
    onLoad: function (options) {
        this.setData({
            'resourceType':options.type,
            "page_texts":wx.getStorageSync("language_json").resource
        })
        var url = getApp().getDomainName()+"wechat/resource_list?resource_type="+this.data.resourceType
        wx.request({
            url:url,
            method:"GET",
            success:(res) =>{
                this.setData({
                    "resourceList":res.data.resource_list
                })
            },
            fail:(error)=>{
                console.error("请求失败",error) 
            }
            
        })
    },
    onShow: function(){
    },
  
  });