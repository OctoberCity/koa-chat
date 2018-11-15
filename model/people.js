var mongoose=require("mongoose"); 

 

var peopleSchema=new mongoose.Schema({ 
	id:Number,
	username:String,
	password:String,
	friendArray:{type:Array,default:[]},//好友id
	headImageSrcName:{type:String,default:"head-default-Portrait.jpeg"},
	headImageName:{type:String,default:"head-default-Portrait.jpeg"}
});
 
  

//通过草稿建造模型peoplemodule
var peoplemodule=mongoose.model("peoplemodule",peopleSchema);
//将这个模型暴露出去
module.exports=peoplemodule;