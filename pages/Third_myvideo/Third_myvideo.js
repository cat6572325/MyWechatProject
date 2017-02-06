// pages/Third_myvideo/Third_myvideo.js
Page({
  data:{
lists:[]

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that=this;
    var token=wx.getStorageSync('token')
    wx.request({
      url: 'http://tp.newteo.com/user/pub?token='+token,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 heade
      
      success: function(res){
        // console.log(res.data)
        that.setData({
          lists: res.data
        })
        console.log(that.data.lists);
        that.setData({
          lists: that.data.lists.concat({iswho: 1})
        })
        console.log(that.data.lists)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})