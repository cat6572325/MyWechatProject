Page({
 
  data:{
    // text:"这是一个页面"
    ListView:[],
     dd:'',
     hidden:false,
     page: 1,
     size: 20,
     hasMore:true,
     hasRefesh:false,
     isHide :true
     
  },
  onLoad:function(options){
    var that = this;

    
  },
   onReady:function(res){
    // 页面渲染完成
    this.videoCon=  wx.createVideoContext('itemVideo'),
    this.videoCon.play()
    this.data.ListView: this.videoCon,
    ListView[0].pause()
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
   //点击事件处理
  bindViewTap: function(e) {
  },
  //加载更多
  loadMore: function(e) {
     var that = this;
    that.setData({
    isHide:false,});

     console.log('ss');
   
},
//刷新处理
refesh: function(e) {
 var that = this;
 that.setData({
    isHide:true,
 });
},
    function(res){
     console.log(res);
 
}
})