// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized' 

// 云函数入口函数
exports.main = async (event, context) => {
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result;
  })
  console.log(playlist);
  for(let i = 0,len = playlist.length; i < len; i++){
  await db.collection('playlist').add({
      data: {
        ...playlist[i],
        createTime: db.serverDate(),
      }
    }).then((res)={
      
    }).catch(()=>{
      console.error('失败')
    })
  }
}