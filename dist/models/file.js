const mongoose=require("../libs/mongoose"),Schema=mongoose.Schema;let schema=new Schema({fileid:{type:String,required:!0},filename:{type:String,required:!0},fileext:{type:String,required:!0}});exports.File=mongoose.model("File",schema);