const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/database");
const userSchema= new mongoose.Schema({
	fullname:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String
	},
	email:{
		type:String,
		required:true
	},
	profileImage:{type:String,
		default:"default.png"
	},
	board:{
		type:Array,
		default:[]
	},
	posts:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"post"
	}]
})
userSchema.plugin(plm);
module.exports=mongoose.model("user", userSchema);
