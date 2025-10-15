const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category');
const checkAuth = require('../middleware/checkAuth');

// =================== ADD CATEGORY ===================
router.post('/add', checkAuth, (req, res) => {
  const newCategory = new categoryModel({
    userId: req.userData.userId,   // ✅ take from token, not body
    title: req.body.title,
    imgUrl: req.body.imgUrl
  });

  newCategory
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Category added successfully',
        category: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error adding category',
        error: err
      });
    });
});

// =================== GET USER'S OWN CATEGORIES ===================
router.get('/all', checkAuth, (req, res) => {
  categoryModel.find({ userId: req.userData.userId }) // ✅ correct way
    .then(result => {
      res.status(200).json({
        message: "Fetched user's categories successfully",
        categoryList: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error fetching categories',
        error: err
      });
    });
});

router.delete('/delete/:id',checkAuth,(req,res)=>{
  categoryModel.deleteOne({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      message:'deleted successfully',
      result:result
    })
  })
  .catch(err=>{
    res.status(500).json({
      message:'error in deleting',
      error:err
    })
  })
})

router.put('/update/:id',checkAuth,(req,res)=>{
  categoryModel.updateOne({_id:req.params.id},{
    title:req.body.title,
    imgUrl:req.body.imgUrl
  })
  .then(result=>{
    res.status(200).json({
      message:'updated successfully',
      result:result
    })
  })
  .catch(err=>{
    res.status(500).json({
      message:'error in updating',
      error:err
    })
  })
})


module.exports = router;
