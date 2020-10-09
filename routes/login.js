const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {SECRET_KEY} = require('../config/key');

router.post('/', async(req, res) => {
    //check Admin
    const checkUser = await Admin.findOne({email : req.body.email});

    if(!checkUser)
        return res.status(401).json({status : 'Email or Password is incorrect'})

    //compare Password
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);

    if(!comparePassword)
        return res.status(401).json({status : 'Email or Password is incorrect'})

    const token = jwt.sign({ id: checkUser._id }, SECRET_KEY);

    res.json({status : 'Logged in successfully!', token})

})

module.exports = router;