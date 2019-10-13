const express = require('express')
const router = require('express').Router();
const User = require('../models/User')

router.get('/users/signin', async(req, res) => {
  res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async(req, res) =>{
  const { name, email, password, confirm_password} = req.body;
  const errors = [];
  if (name.length<=0) {
    errors.push({text: 'Please insert your name'})
  }
  if (password != confirm_password) {
    errors.push({text:'Password does not match'})
  }
  if (password.length<4) {
    errors.push({text: 'Password length must be at least 4 characters'})
  }
  if (errors.lengt>0) {
    res.render('/users/signup', {errors, name, email, password, confirm_password})
  } else {
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'You are registered')
    res.redirect('/users/signin')
  }

});
module.exports = router;
