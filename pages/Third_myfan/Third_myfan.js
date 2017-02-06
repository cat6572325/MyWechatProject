// pages/Third_history/Third_history.js
Page({
  data:{
lists: []


  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that=this;
    var myData=wx.getStorageSync('myData');

    that.getfavorites()
   
  },
  getfavorites: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: 'http://tp.newteo.com/user/favorite/get?&token='+token,
      method: 'GET',
      success: function (res) {
        console.log(res.data.favorites)
        that.setData({
          lists: res.data.favorites
        })
          that.setData({
          lists: that.data.lists.concat({iswho: '1'})
        })
      }
    })
  },
})