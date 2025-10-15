const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    imgUrl:{type:String,required:true},
    userId:{type:String,required:true},
    categoryId:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('blog',blogSchema);