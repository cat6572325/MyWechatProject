//index.js  
//获取应用实例  
var app = getApp()

Page({
  data: {
    hasRefesh: false,//显示部刷新
    // 页面配置 
    hasMore: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    channel: 'hot',
    ListView: [], //列表容器
    Listdobe: [],//列表容器
    Listcurious: [],//列表容器 猎奇
    Listentertainment: []//列表容器 娱乐
  },
  onLoad: function () {
    var that = this;

    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
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
    var that = this
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
        console.log(res.data[0])
        hasRefesh: false
        that.setData({
          ListView: res.data

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
    if(e.detail.current===0)
    {
      if(that.data.ListView.length<1)
      {
        that.refesh()
      }
    }
    if(e.detail.current===1)
    {
          if(that.data.Listdobe.length<1)
      {
        that.refesh()
        //console(that.data.Listdobe.length+'')
      }
    }
    if(e.detail.current===2)
    {
         if(that.data.Listcurious.length<1)
      {
        that.refesh()
      }
    }
    if(e.detail.current===3)
    {
         if(that.data.Listentertainment.length<1)
      {
        that.refesh()
      }
    }
  },

  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab
      === e.target.dataset.current) {
      return false;
    } else {
      that.setData(
        {
          currentTab: e.target.dataset.current
        })
    }
  },
  ///////////
  moreClick: function()
  {//更多点击
    console.log('点击了更多')
  },
  //加载更多
  loadMore: function () {
    var that = this;
    that.setData({
      hasMore: true,
    });
    setTimeout(function () {
      that.setData({
        hasRefesh: false
      })
    }, 2000)
    //TODO 网络请求，加载数据
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
          ListView: res.data

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
  ///////////
  //刷新数据
  refesh: function () {
    var that = this;
    var tabnum = that.data.currentTab;
    that.setData({
      hasRefesh: true,
    }),
      setTimeout(function () {
        that.setData({
          hasRefesh: false
        })
        wx.showToast({
          title: '成功',
          icon: 'success',

          duration: 500
        })
      }, 2000)
    if (tabnum === 0) {//如果当前页面是 最热
      that.setData
        (
        {
          channel: 'hot'
        }
        )

    }
    if (tabnum === 1) {//如果是逗比
      that.setData
        (
        {
          channel: 'dobe'
        }
        )
    }
    if (tabnum === 2) {//如果是猎奇
      that.setData
        (
        {
          channel: 'curious'
        }
        )
    }
    if (tabnum === 3) {//如果是娱乐
      that.setData
        (
        {
          channel: 'entertainment'
        }
        )
    }



    wx.request({
      //TODO 网络请求，获取视频最新最热列表
      url: 'http://tp.newteo.com/video/sort/new?channel=' + that.data.channel + '&per5&page=1', //仅为示例，并非真实的接口地址
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
           if (tabnum === 0) {//如果当前页面是 最热
      that.setData
        (
        {//如果是第一页
       
          ListView: res.data
      
        }
        )

    }
    if (tabnum === 1) {//如果是逗比
      that.setData
        (
        {
          Listdobe: res.data
              
  
        }
        )
             console.log('1')
  
    }
    if (tabnum === 2) {//如果是猎奇
      that.setData
        (
        {
          Listcurious: res.data
        }
        )
             console.log('2')
  
    }
    if (tabnum === 3) {//如果是娱乐
      that.setData
        (
        {
          Listentertainment: res.data
        }
        )
             console.log('3')
  
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