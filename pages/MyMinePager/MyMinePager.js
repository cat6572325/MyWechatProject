// pages/MyMinePager/MyMinePager.js
Page({
  data:{
     items: [
      {name: 'USA', value: '男'},
      {name: 'CHN', value: '女', checked: 'true'},
    ],
    MyList: [
      {title: '目前记录的昵称为：\n你可以在下方直接修改'
      ,input: '1',placeholder: '谭明'}
    ,{title: '目前记录的手机为：\n你可以在下方直接修改'
    ,input: '59',placeholder: '15913044423'}
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
console.log(event.crrentTagt);//获取input的index值
  }
})