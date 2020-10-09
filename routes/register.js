const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {SECRET_KEY} = require('../config/key');

router.post('/', async(req, res) => {
    //check user
    const chechUser = await User.findOne({email : req.body.email})

    if(chechUser)
        return res.status(401).json({status : 'User already exist'})

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try{
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword
        })

        const saveUser = await newUser.save();

        const token = jwt.sign({ id: saveUser._id }, SECRET_KEY);
        
        res.json({status : 'User is created Successfully!', token})
    }

    catch(err){
        res.status(403).json({status : 'Unable to create a user'})
    }

})

module.exports = router;