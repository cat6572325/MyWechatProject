// pages/MyMinePager/MyMinePager.js

var api = require("../../utils/util.js")
var user = require("../../utils/Users.js")

var app=getApp();
Page({
  data:{
    
    head_pic:''
    ,nickname:'',
    floating_anima: {},
    hidemodal: true,
    avatarUrl:'',
     items: [
      {name: 'man', value: '男'},
      {name: 'miss', value: '女', checked: 'true'},
    ],
    MyList: [
      {
        wall:'../../image/a.png'
        
        ,iswho: '3'
      },
      {
        iswho: '4'
      },
      {title: '我的订阅'
      ,icon: ' ../../image/subscription.png'
      ,iswho:'1'}
    ,{title:'我喜欢的'
    ,icon: ' ../../image/likes.png'
    ,iswho:'1'}
    ,{title: '播放历史'
    ,icon: ' ../../image/watched_icon.png'
    ,iswho:'2'}
    
    ,{title: '兴趣选择'
    ,icon: ' ../../image/select.png'
    ,iswho:'1'}
    ,{title: '反馈'
    ,icon: ' ../../image/feedback.png'
    ,iswho:'1'}
    ,{title: '版本检测'
    ,icon: ' ../../image/mobile.png'
    ,iswho:'1'}

    ],
   markers: [{
      iconPath: "../../image/a.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: "../../image/oval_7.png",
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
   onShow: function(){

    var animation = wx.createAnimation({
      //悬浮按钮的动画
      duration: 1000,
        timingFunction: 'ease',
    })
    this.animation = animation
    animation.scale(1,1).step()
    this.setData({
      animationData:animation.export()
    })
 var that = this
    //调用应用实例的方法获取全局数据
    var list=wx.getStorageSync('myData')
  that.setData({
    head_pic: list.head_pic,
    nickname:list.nickname,
  })
      
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  complite: function(event)
  {//当某一个输入框有enter事件的时候
//event.detail = {value: value}
console.log(event.currentTarget.dataset.inputdata);//获取input的index值
  },
  login_out: function()
  {
    var animation = wx.createAnimation({
      duration: 500,
        timingFunction: 'ease',
    })
    this.animation = animation
    animation.scale(0,2).step()
    this.setData({
      animationData:animation.export(),
    })

    this.setData(
      {
        hidemodal: false//开启对话框
        
      }
    )
  },
  hide_modal: function()
  {//点击退出登陆并隐藏对话框
    console.log('点击了退出')
this.setData(
      {
        hidemodal: true,
      userInfo:{},
        headurl:'',
        nickname:''
      }
      
)
try {
  wx.removeStorageSync('token')
} catch (e) {
  // Do something when catch error
}
  },
  cancel_modal: function()
  {//点击蒙层取消modal并重新显示floating_action_button
    console.log('点击了蒙层');
    var animation = wx.createAnimation({
      duration: 500,
        timingFunction: 'ease',
    })
    this.animation = animation
    animation.scale(1,1).step()
 
    this.setData(
      {
animationData:animation.export(),
        hidemodal: true
      }
    )
  },
  item_click: function(v)
  {
    var titles=v.target.dataset.title;
    if(titles==='我的订阅')
    {
      console.log(v.currentTarget)
    }
    if(titles=='我喜欢的')
    {
      wx.navigateTo({
        url: '../Third_favorite/Third_favorite',
        success: function(res){
        },
        fail: function() {
        },
        complete: function() {
        }
      })
    }

    
      if(titles=='播放历史')
    {
      wx.navigateTo({
  url: '../Third_history/Third_history'
})
    }
      if(titles=='兴趣选择')
    {
      console.log(v.target.dataset.title)
    }
      if(titles=='反馈')
    {
      console.log(v.target.dataset.title)
    }
    if(titles==='版本检测')
    {
      console.log(v.target.dataset.title)
    }
    if(titles==='预留')
    {
      console.log(v.target.index)
    }
  },
  toMyVideo: function(v)
  {//TODO  跳往我的视频界面
  wx.navigateTo({url: '../Third_myvideo/Third_myvideo'})
  },
  toMyFollow: function(v)
  {//TODO  跳往我的关注界面
wx.navigateTo({url: '../Third_myfollow/Third_myfollow'})
  },
  toMyFan: function(v)
  {//TODO  跳往我的粉丝界面
wx.navigateTo({url: '../Third_myfan/Third_myfan'})
  },
  changeMyData:function(v)
  {//TODO  跳往修改信息界面
wx.navigateTo({url: '../Third_ichanged/Third_ichanged'})
  }
})