//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  addListener: function(callback)
  {
this.callback = callback;
  },
  post_http: function(MyHashMap)
{
    var Url=MyHashMap.url
    
   
    var quantity=MyHashMap.quantity;
       console.log(quantity)
    
     //console.log(quantity);
    var Url=MyHashMap.url;
    
    var Url=MyHashMap.url;
 
    
  wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: Url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data: quantity,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 连接成功返回数据
        console.log(res.data)

        try {
    wx.setStorageSync('token', res.data.token)
 if (this.callback != null) {
   //将数据传出去
      this.callback(res.data);
    }
   
} catch (e) {    
}
      },

      fail: function () {//TODO 连接失败 
        wx.showModal({
          title: '提示',
          content: '网络连接失败',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  }

})