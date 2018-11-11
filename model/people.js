var mongoose=require("mongoose"); 

var safe = { w: "majority", wtimeout: 10000 };

var peopleSchema=new mongoose.Schema({ 
	_id:mongoose.Schema.Types.ObjectId,
	username:String,
	password:String,
	friendArray:{type:Array,default:[]},//好友id
	headImageSrcName:{type:String,default:"head-default-Portrait.jpeg"},
	headImageName:{type:String,default:"head-default-Portrait.jpeg"}
},{safe:safe});
 
peopleSchema.set('toObject', { getters: true }); 

//通过草稿建造模型peoplemodule
var peoplemodule=mongoose.model("peoplemodule",peopleSchema);
//将这个模型暴露出去
module.exports=peoplemodule;