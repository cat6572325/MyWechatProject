Page({
  data:{
    // text:"这是一个页面"
    ListView:[{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'},{message:'s'}],
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
    var url = 'http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&pno=1&ps=10';
  
     console.log(res);
    
  },
  onReady:function(){
    // 页面渲染完成
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