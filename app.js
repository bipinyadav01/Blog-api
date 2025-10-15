const express = require('express')
const app = express()


const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const catRouter = require('./routes/category')

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://billa:bipin8881212@billa.byhx1.mongodb.net/?retryWrites=true&w=majority&appName=billa")
.then(()=>{
    console.log('data base is connected')
})
.catch((err)=>{
    console.log('data base connect nahi ho pa rha',err)

})

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.use('/category',catRouter)



module.exports = app;