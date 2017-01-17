//index.js  
//获取应用实例  
var app = getApp()

Page({
  data: {
    VideoList: [],//每个视频的实例列表
    hasRefesh: false,//显示部刷新
    // 页面配置 
    hasMore: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,

    ListView: [] //列表容器

  },
  onLoad: function () {
    var that = this;

    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res)
       {
        that.setData(
          {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onReady: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })

    //this.videoCon=ListView[0].video ,
    // this.videoCon.play()
var that=this
    //this.data.VideoList.push( this.videoCon)
    wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: 'http://tp.newteo.com/video/sort/new?channel=hot&per5&page=1', //仅为示例，并非真实的接口地址
      data: {
        //TODO 要送的附加数据
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 连接成功返回数据
        console.log(res.data[0].video_url.vid_url)
        hasRefesh: false
         that.setData({
        ListView:res.data

         })
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
  
    // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  
   //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab
     === e.target.dataset.current)
      {
      return false;
    } else 
    {
      that.setData(
        {
        currentTab: e.target.dataset.current
      })
    }
  },

  //加载更多
  loadMore: function ()
  {
    var that = this;
    that.setData({
      hasMore: true,
    });
  },

  //刷新数据
  refesh: function () {
    var that=this;
    that.setData({
      hasRefesh: true,
    }),
    setTimeout(function(){
         that.setData({
  hasRefesh: false
         })
         wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 500
    })
},2000),
 

    //this.videoCon=ListView[0].video ,
    // this.videoCon.play()

    //this.data.VideoList.push( this.videoCon)
    wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: 'http://tp.newteo.com/video/sort/new?channel=hot&per5&page=1', //仅为示例，并非真实的接口地址
      data: {
        //TODO 要送的附加数据
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //TODO 连接成功返回数据
        console.log(res.data[0].video_url.vid_url)
          that.setData({
        ListView:res.data
         })
         
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