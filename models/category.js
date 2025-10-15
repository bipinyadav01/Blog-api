const mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true,unique:true},
    imgUrl:{type:String,required:true}
})

module.exports = mongoose.model('Category',catSchema)