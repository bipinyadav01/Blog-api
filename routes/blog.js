const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const blogModel = require('../models/blog')

router.post('/add-blog',checkAuth,(req,res)=>{
    const newBlog = new blogModel({
        title:req.body.title,
        content:req.body.content,
        imgUrl:req.body.imgUrl,
        userId:req.body.userId,
        categoryId:req.body.categoryId
    })
    newBlog.save()
    .then(result=>{
        res.status(201).json({
            message:'Blog added successfully',
            blog:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:'Error in adding blog',
            error:err
        })
    })


    router.get('/all',checkAuth,(req,res)=>{
        blogModel.find()
        .then(result=>{
            res.status(200).json({
                message:'Fetched all blogs successfully',
                blogList:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'Error in fetching blogs',
                error:err
            })
        })  
    })

    router.get('/:categoryId',checkAuth,(req,res)=>{
        blogModel.find({categoryId:req.params.categoryId})
        .then(result=>{
            res.status(200).json({
                message:'Fetched blogs by category successfully',
                blogList:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'Error in fetching blogs by category',
                error:err
            })
        })
    })

    router.delete('/delete/:id',checkAuth,(req,res)=>{
        blogModel.deleteOne({_id:req.params.id})
        .then(result=>{
            res.status(200).json({
                message:'Blog deleted successfully',
                result:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'Error in deleting blog',
                error:err
            })
        })
    })

    router.put('/update/:id',checkAuth,(req,res)=>{
        blogModel.updateOne({_id:req.params.id},{
            title:req.body.title,
            content:req.body.content,
            imgUrl:req.body.imgUrl,
            categoryId:req.body.categoryId
        })
        .then(result=>{
            res.status(200).json({
                message:'Blog updated successfully',
                result:result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'Error in updating blog',
                error:err
            })
        })
    })
})






module.exports = router;