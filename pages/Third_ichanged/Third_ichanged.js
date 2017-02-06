// pages/Third_ichanged/Third_ichanged.js
var inputs

Page({

  data:{
    lists: [{iswho: '0' 
    ,title: '头像'
    ,nickname: '../../image/a.png'}
    ,{iswho: '1'
      ,title: '昵称'
      ,nickname: 'null'}
      ,{iswho: '1'
      ,title: '性别'
      ,nickname: 'null'}
      ,{iswho: '1'
      ,title: '签名'
      ,nickname: 'null'}],
      sexs: [{name: '1', value: '男'},
      {name: '2', value: '女', checked: 'true'},
      {name: '3', value: '保密'}],
      Mymodal: true,
      input: false,
      inputData: '请输入',
      sex: false,
      modalTitle: '标题'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
   this.initData();
  },
  initData: function()
  {
     var that=this;
    var list=wx.getStorageSync('myData')

    var sex;
    if(list.sex=='1')
    {
      sex='男'
    }
    if(list.sex=='2')
    {
      sex='女'
    }
    if(list.sex=='3')
    {
      sex='保密'
    }
    that.setData({
      lists: that.data.lists.map((v)=>
      {
        console.log(v)
        if(v.title=='头像')
        {
          v.nickname=list.head_pic
        }

        if(v.title=='昵称')
        {//如果标题等于昵称
          v.nickname=list.nickname
        //修改这个item的的nickname 值

        }
         if(v.title=='性别')
        {//如果标题等于昵称
        
          v.nickname=sex
        //修改这个item的的nickname 值

        }
        if(v.title=='签名')
        {
          v.nickname=list.signature
        }
        return v;
      }),
      modalTitle: '无选择',
      input: false,
      sex: false,
      inputData: '请输入',
    })
    inputs=undefined
    
  },
sexChange: function(v)
{// 改变信息中的性别
  var that=this;
  var url='http://tp.newteo.com/user/change?token='+wx.getStorageSync('token');
  
  wx.request({
    url: url,
    data: {
      sex: v.detail.value
    },
    method: 'PATCH', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      wx.setStorageSync('myData', res.data)
      that.initData();
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
    },
   
  })
},
nicknameChange: function(v)
{// 改变信息中的昵称
  var that=this;
  var url='http://tp.newteo.com/user/change?token='+wx.getStorageSync('token');
  
  wx.request({
    url: url,
    data: {
      nickname: v
    },
    method: 'PATCH', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      wx.setStorageSync('myData', res.data)
      that.initData();
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
    },
   
  })
},
signatureChange: function(v)
{// 改变信息中的签名
  var that=this;
  var url='http://tp.newteo.com/user/change?token='+wx.getStorageSync('token');
  
  wx.request({
    url: url,
    data: {
      signature: v
    },
    method: 'PATCH', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      wx.setStorageSync('myData', res.data)
      that.initData();
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
    },
   
  })
},
Hide_modal: function(v)
{//确认隐藏对话框
var that=this;
console.log(that.data.modalTitle)
if(that.data.modalTitle=='昵称')
{
  if(inputs!=undefined)
  {
that.nicknameChange(inputs)
  }
}
if(that.data.modalTitle=='签名')
{

  if(inputs!=undefined)
  {
  that.signatureChange(inputs)
  }
}
this.setData({
  Mymodal: true
})
},
cancel_modal: function(v)
{
//隐藏对话框
this.setData({
  Mymodal: true
})
},
item_click: function(v)
{
  var that=this;
  var inputdata=wx.getStorageSync('myData')
  console.log(inputdata)
  if(v.target.dataset.title=='头像')
  {
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    that.changeHeadImage(res.tempFilePaths[0])
    that.setData({
      lists: that.data.lists.map((v)=>
      {
        console.log(v)
        if(v.title=='头像')
        {
          v.nickname=res.tempFilePaths[0]
        }
        return v
      })
    })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
  if(v.target.dataset.title=='昵称')
  {
    that.setData({
      Mymodal: false,
      modalTitle: '昵称',
      input: true,
      inputData: inputdata.nickname,
    })
  }
  if(v.target.dataset.title=='性别')
  {
     that.setData({
      Mymodal: false,
      modalTitle: '性别',
      input: false,
      sex: true,
    })
  }
  if(v.target.dataset.title=='签名')
  {
    that.setData({
      Mymodal: false,
      modalTitle: '签名',
      input: true,
      sex: false,
      inputData: inputdata.signature,
    })
  }

},
input_method: function(v)
{
  inputs= v.detail.value
  console.log(inputs)
},
changeHeadImage: function(path)
{
var url='http://tp.newteo.com/user/headimg?token='+wx.getStorageSync('token')
var that=this;
wx.uploadFile({
  url: url,
  filePath:path,
  name:'headimg',
  // header: {}, // 设置请求的 header
  // formData: {}, // HTTP 请求中其他额外的 form data
  success: function(res){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
    
    
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