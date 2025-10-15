const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ✅ fixed spelling

// =================== SIGNUP ===================
router.post('/signup', (req, res) => {
  console.log(req.body);

  userModel
    .find({ email: req.body.email })
    .then(result => {
      if (result.length > 0) {
        return res.status(400).json({
          message: 'User already exists',
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: 'Error in hashing password',
            error: err,
          });
        }

        const newUser = new userModel({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
        });

        newUser
          .save()
          .then(result => {
            res.status(201).json({
              message: 'User signed up successfully',
              newUser: result,
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'User signup failed',
              error: err,
            });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error', error: err });
    });
});

// =================== LOGIN ===================
router.post('/login', (req, res) => {
  userModel
    .find({ email: req.body.email })
    .then(result => {
      if (result.length < 1) {
        return res.status(401).json({
          message: 'User does not exist',
        });
      }

      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err || !response) {
          return res.status(401).json({
            message: 'Invalid password',
          });
        }

        const token = jwt.sign(
          {
            email: result[0].email,
            userId: result[0]._id,
            lastname: result[0].lastname,
            firstname: result[0].firstname,
          },
          'secret',
          { expiresIn: '365d' } // ✅ fixed typo (was "365dh")
        );

        res.status(200).json({
          message: 'Login successful',
          userId: result[0]._id,
          email: result[0].email,
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          token: token,
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error', error: err });
    });
});

module.exports = router;


