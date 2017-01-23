//index.js  
//获取应用实例  
var app = getApp()
var user = require("../../utils/Users.js")

Page({
  data: {
    hasRefesh: false,//显示部刷新

    // 页面配置 
    hasMore: false,
    winWidth: 0,
    winHeight: 0,
    like_s: true,
    // tab切换  
    currentTab: 0,
    channel: 'hot',
    favorites: [],//我喜欢的视频所有id
    ListView: [], //列表容器
    Listdobe: [],//列表容器
    Listcurious: [],//列表容器 猎奇
    Listentertainment: [],//列表容器 娱乐
    pages: 1//表示现在有几页
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

    var that = this
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
        //res为json，可以直接调用string

        //TODO 连接成功返回数据
        console.log(res.data)
        hasRefesh: false
        that.setData({
          ListView: res.data.map((v) => {
                return Object.assign(v, { like: true })//临时赋值为false
              })
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
    console.log(user.phone)
    this.getMyData()
    try {
      user.token = wx.getStorageSync('token')
      user.nickname = wx.getStorageSync('nickname')
      user._id = wx.getStorageSync('myid')
    } catch (e) {
      console.log(user.phone)
    }
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current === 0) {
      if (that.data.ListView.length < 1) {
        that.refesh()
      }
    }
    if (e.detail.current === 1) {
      if (that.data.Listdobe.length < 1) {
        that.refesh()
        //console(that.data.Listdobe.length+'')
      }
    }
    if (e.detail.current === 2) {
      if (that.data.Listcurious.length < 1) {
        that.refesh()
      }
    }
    if (e.detail.current === 3) {
      if (that.data.Listentertainment.length < 1) {
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

  getMyData: function () {//TODO 获取我的信息
  var that=this
  try{
    var mUrl='http://tp.newteo.com/user/info?token=' + wx.getStorageSync('token')
    wx.request({

      //TODO 网络请求，获取视频最新最热列表
      url: mUrl, //仅为示例，并非真实的接口地址
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
        console.log(mUrl)
        //TODO 连接成功返回数据
                //TODO 这是个临时的的
    //在这里比较favorites和listview
    user.myfavorites=res.data.favorites
    for(var i=0;i<that.data.ListView.size;i++)
    {
        for(var y=0;y<user.myfavorites.size;y++)
        {
          console.log(y+ListView[y])
        }
    }
        try {
          wx.setStorageSync('nickname', res.data.nickname)
          wx.setStorageSync('myid', res.data._id)
        } catch (e) {

        }

        
      },
      fail: function () {//TODO 连接失败 
        wx.showModal({
          title: '提示',
          content: '网络连接失败',
          success: function (res) {

          }
        })
      }
    })
  }catch(e){
    
  }
  },
  commentClick: function(event)
  {
    var vid=event.currentTarget.dataset.id
    console.log(vid)
    wx.navigateTo({
      url: '../Run_Video_/Run_Video_?cids='+this.data.ListView.comments+'&vid'+vid//需要通过vid找寻listview集中的对应item，然后将该item所包含的comments发送过去第二页面
    })
  },
  moreClick: function () {//更多点击
    console.log('点击了更多')
  },
  likeClick: function (event) {
    var that=this
    var vid = event.currentTarget.dataset.id
    console.log('vid'+vid)
  try{
    var mUrl='http://tp.newteo.com/user/favorite?vid='+vid+'&token=' + wx.getStorageSync('token')
    wx.request({

      //TODO 网络请求，获取视频最新最热列表
      url: mUrl, //仅为示例，并非真实的接口地址
      data: {
        //TODO 要送的附加数据
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

   that.setData({
          ListView: that.data.ListView.map((v) => {
            if (v._id == vid) {
              v.like = !v.like
            }
            return v
          })
   }
   )
        
      },
      fail: function () {//TODO 连接失败 
        wx.showModal({
          title: '提示',
          content: '网络连接失败',
          success: function (res) {

          }
        })
      }
    })
  }catch(e){
    
  }
    
  },
  //加载更多
  loadMore: function () {
    var that = this;
    var tabnum = that.data.currentTab;//表示现在是位于那个页面
    var url;
    that.setData({
      hasMore: true,
    });

    if (tabnum === 0) {//如果当前页面是 最热
      that.setData
        (
        {
          channel: 'hot',
          pages: that.data.ListView.length / 5 + 1 //将现有容器内有多少条内容除以每页本应5条，然后加上1表示加载下一页
          //通过Math方法的的ceil进行向上取整
        }
        )

    }
    if (tabnum === 1) {//如果是逗比
      that.setData
        (
        {
          channel: 'dobe',
          pages: that.data.Listdobe.length / 5 + 1 //将现有容器内有多少条内容除以每页本应5条，然后加上1表示加载下一页
        }
        )
    }
    if (tabnum === 2) {//如果是猎奇
      that.setData
        (
        {
          channel: 'curious'
          ,
          pages: that.data.Listcurious.length / 5 + 1 //将现有容器内有多少条内容除以每页本应5条，然后加上1表示加载下一页
        }
        )
    }
    if (tabnum === 3) {//如果是娱乐
      that.setData
        (
        {
          channel: 'entertainment',
          pages: that.data.Listentertainment / 5 + 1 //将现有容器内有多少条内容除以每页本应5条，然后加上1表示加载下一页
        }
        )
    }
    url = 'http://tp.newteo.com/video/sort/new?channel=' + that.data.channel + '&per5&page=' + that.data.pages
    console.log(url)
    //TODO 网络请求，加载数据
    wx.request({

      //TODO 网络请求，获取视频最新最热列表
      url: url, //仅为示例，并非真实的接口地址
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
        console.log(res.data)
        console.log(res.data.length + ':' + that.data.pages)
        if (tabnum === 0) {//如果当前页面是 最热
          that.setData
            (
            {//如果是第一页

              ListView: that.data.ListView.concat(res.data.map((v) => {
                return Object.assign(v, { like: [] })//临时赋值为false
              })
              )

            }
            )
          console.log(res.data[0]);

        }
        if (tabnum === 1) {//如果是逗比
          that.setData
            (
            {
              Listdobe: that.data.Listdobe.concat(res.data.map((v) => {
                return Object.assign(v, { like: [] })//临时赋值为false
              })
              )

            }
            )
          console.log('1')

        }
        if (tabnum === 2) {//如果是猎奇
          that.setData
            (
            {
              Listcurious: that.data.Listcurious.concat(res.data.map((v) => {
                return Object.assign(v, { like: [] })//临时赋值为false
              })
              )
            }
            )
          console.log('2')

        }
        if (tabnum === 3) {//如果是娱乐
          that.setData
            (
            {
              Listentertainment: that.data.Listentertainment.concat(res.data.map((v) => {
                return Object.assign(v, { like:that.data.favorites.includes(v._id)})//临时赋值为false
              })
              )
            }
            )


        }
        console.log(that.data.pages)


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

              ListView: res.data.map((v) => {
                return Object.assign(v, { like: that.data.favorites.includes(v._id) })//临时赋值为false
              })


            }
            )
          console.log(res.data[0]);

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