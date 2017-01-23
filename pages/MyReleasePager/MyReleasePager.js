// pages/MyReleasePager/MyReleasePager.js
var user = require("../../utils/Users.js")
var http_util = require("../../utils/Http_util.js")
var phones='15913044423',passwords='cat6572325'
var app=getApp()
Page({
  data:{
    Mymodal: true
  },
  onLoad:function(options){
   
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    

  },
  onShow:function(){
    // 页面显示
    var that= this;
    try {
    var value = wx.getStorageSync('token')
    if(!value)
    {
      this.setData(
        {
          Mymodal: false

        }
      )
    }else{
           wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
      camera: 'back',
            success: function(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    }
} catch (e) {  
   wx.showModal({
  title: '提示',
  content: '失败',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})
}
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  complit_phone: function(e)
  {//账号输入触发
    phones=e.detail.value
  },
  complit_password: function(e)
  {//密码输入触发
   passwords=e.detail.value
  },
  hide_modal: function(e)
  {//当点击确认按钮时  
  var that = this;
  wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: 'http://tp.newteo.com/login', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {phone: phones , password: passwords},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 连接成功返回数据
         if(res.data.token!=null)
        {
               console.log(res.data)
               wx.setStorageSync('token', res.data.token)
               //保存token
               that.setData(
                 {
                   Mymodal: true//隐藏登陆框
                 }
               )
    
        }else
        {
          wx.showModal({
  title: '提示',
  content: '登陆失败',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})
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
   
  },
  
   
  
})
