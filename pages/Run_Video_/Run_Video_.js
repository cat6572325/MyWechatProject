// pages/Run_Video_/Run_Video_.js
var user = require("../../utils/Users.js")
var cid
Page({
  data:{
      commentList: [{nickname: '1'},{nickname: '2'},{nickname: '3'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},{nickname: 'a'},]

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    if(options.cids==undefined)
    {
        console.log(options.cids)
    }
  

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },


  getComment: function()
  {//获取该视频所有评论
        var that = this
    wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: 'http://tp.newteo.com/user/comment/laud?cid='+cid+'&token='+wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        //TODO 要送的附加数据
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       console.log(res.data)
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