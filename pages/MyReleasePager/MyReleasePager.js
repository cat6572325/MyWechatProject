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
    console.log(user.myid)
    if(user.myid===undefined)
    {
      this.setData(
        {
          Mymodal: false
        }
      )
    }
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
  complit_phone: function(e)
  {//账号输入触发
    phones=e.detail.value
  },
  complit_password: function(e)
  {//密码输入触发
   passwords=e.detail.value
  },
  hide_modal: function(e)
  {//当点击确认按钮时调用http_util中的的post_http登陆
      console.log('登陆按钮：'+e.dataset)
       var MyHashMap= {
         url: 'http://tp.newteo.com/login'
       ,quantity: {phone: phones,password:passwords
       }
       }
    app.post_http(MyHashMap);
    this.changeData();
  },
  changeData: function()
  {
    app.addListener(function (changedData) {
      console.log(changedData)
      this.setData({
        //添加监听，如果数据发生变化
        Mymodal: true  //变量是是bool类型的
      });
    });
  }
  
})
