const formidable = require('formidable');
const fs = require("fs");
const path =require("path"); 
const jwt = require('jsonwebtoken')


 //实例化模型model
 const People=require("../model/people.js");
 const people=new People();


//执行用户注册操作
exports.registerPeople=async(ctx)=>{
  const params=ctx.request.body;  
  people.username=params.username;
  people.password =params.password;
   const files = ctx.request.files; 
  for (let key in files) { 
    const file = files[key];
    const servername=file.path.split("\\"); 
    people.headImageSrcName= servername[servername.length-1];
  }
  //数据库插入操作 
  const result= await people.save();
   ctx.response.redirect('/');
}  

 

  
//执行登录操作，并生成一个sessionId
exports.dologin=async(ctx)=>{ 
const params = ctx.request.body; 
// 匹配数据库，判断登录
const doc= await People.findOne(params);
if(!doc){
  ctx.body={status:0,message:'查无此人'}
}
const user={id:doc.id,username:doc.username};  
//获得token
const token = jwt.sign(user,'hjwscrazy', {expiresIn: '1h'});
ctx.body={status:1,message:'有我的证件救命',token};
}

//获取好友列表，所有在线列表
exports.chatPeopleList=async(ctx)=>{
  //获得请求中的request.userInfo
const params=ctx.request.userInfo; 
const doc= await People.find({_id:params.id}); 
res.body=doc.friendArray;
}

//添加好友
exports.addChatPeopleFriend=async(ctx)=>{
const params=ctx.request.params;
const friend ={
   id:params.friendId,//好友id
   name:params.friendName,//好友用户名字
   hImage:params.friendImage,//好友头像路径
};
const myDoc= await People.findOne({_id:params.id});
//寻找自己的还有列表，并将好友加进去，以后改成表关联
const newFriendList =myDoc.friendArray.append(friend);
const doc=People.findOneAndUpdate({'_id':params.id},{'friendArray':newFriendList});
}


//执行登出操作 
exports.dologout=async(ctx)=>{ 
     delete req.session.user;
     delete res.locals.user;
     res.redirect("/");
} 
 