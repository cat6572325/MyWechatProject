// pages/MyMinePager/MyMinePager.js

var api = require("../../utils/util.js")
var user = require("../../utils/Users.js")

Page({
  data:{
    
    floating_anima: {},
    hidemodal: true,
     items: [
      {name: 'man', value: '男'},
      {name: 'miss', value: '女', checked: 'true'},
    ],
    MyList: [
      {title: '目前记录的昵称为：\n你可以在下方直接修改'
      ,input: '1',placeholder: wx.getStorageSync('nickname')}
    ,{title: '目前记录的手机为：\n你可以在下方直接修改'
    ,input: '59',placeholder: user.phone}
    ,{title: '目前记录的性别为：\n你可以在下方直接修改'
    ,redio: '1'}
    
    ,{title: '目前记录的资金为：\n你可以在下方直接修改'
    ,input: '1',placeholder: '$20'}
    ,{title: '目前记录的个人签名为：\n你可以在下方直接修改'
    ,isdata: '1'}
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
      animationData:animation.export()
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
        hidemodal: true
        
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
  }
})