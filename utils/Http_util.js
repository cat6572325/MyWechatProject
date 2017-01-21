
function post_http(MyHashMap)
{
    var Url=MyHashMap.url
    
   
    var quantity=MyHashMap.quantity;
       console.log(quantity)
    
     //console.log(quantity);
    var Url=MyHashMap.url;
    
    var Url=MyHashMap.url;
    var that=MyHashMap.that;

    
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
   Myr.setData(
       {
           Mymodal: false
       }
   )
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
  module.exports.post_http = post_http;