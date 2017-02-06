// pages/MyReleasePager/MyReleasePager.js
var user = require("../../utils/Users.js")
var phones = '15913044423', passwords = 'cat6572325'
var app = getApp()
var path//保存视频路径
var video_title//视频标题
Page({
  data: {
    Mymodal: true,
    readyUpload: true,
    src: '',
    video_title: ''
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    try {
      var value = wx.getStorageSync('token')
      if (!value) {
        this.setData(
          {
            Mymodal: false
          }
        )
      } else {
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: 'back',
          success: function (res) {
            console.log(res)
            that.setData({
              src: res.tempFilePath,
            })
            path = res.tempFilePath;
          }
        })
      }
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '失败',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  complit_video_title: function (v) {//视频标题
   video_title=v.detail.value
  },
  uploadvideo_button: function (b) {
    console.log(b)
    this.setData({
      readyUpload: false
    })
  },
  uploadvideo: function (v) {
    var that = this;
    var uploadurl = 'http://tp.newteo.com/user/video/detail?token=' + wx.getStorageSync('token');

    //上传标题
    wx.request({
      url: uploadurl,
      data: {
        title: video_title
      },
      method: 'POST', 
      success: function (res) {
        console.log(res.data)
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({ title: '上传中..' })
that.setData({
          readyUpload: true
        })
        that.uploadvideo_file(res.data._id)

      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('complete')
      }
    })
  },
  uploadvideo_file: function (vid) {//上传视频
    var that = this
    var saveurl = 'http://tp.newteo.com/user/video/push/' + vid + '?token=' + wx.getStorageSync('token')
    console.log(path)
    wx.uploadFile({
      url: saveurl,
      filePath: path,
      name: 'video',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        })
        wx.hideNavigationBarLoading()
        
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
      }
    })
  },
  cancel_upload: function (v) {//点击蒙层或者取消时
    this.setData({
      readyUpload: true
    })
  },
  complit_phone: function (e) {//账号输入触发
    phones = e.detail.value
  },
  complit_password: function (e) {//密码输入触发
    passwords = e.detail.value
  },
  hide_modal: function (e) {//当点击确认按钮时  
    var that = this;
    wx.request({
      url: 'http://tp.newteo.com/login', 
      method: 'POST',
      data: { phone: phones, password: passwords },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 连接成功返回数据
        if (res.data.token != null) {
          console.log(res.data)
          wx.setStorageSync('token', res.data.token)
          //保存token
          that.getMyData()
          that.setData(
            {
              Mymodal: true//隐藏登陆框
            }
          )
        } else {
          wx.showModal({
            title: '提示',
            content: '登陆失败',
            success: function (res) {
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
  getMyData: function()
  {
    var that=this;
    var token=wx.getStorageSync('token');
    wx.request({
      url: 'http://tp.newteo.com/user/info?token='+token,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        wx.setStorageSync('myData', res.data)
        console.log(res.data)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }



})
