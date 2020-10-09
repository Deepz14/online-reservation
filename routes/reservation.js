const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/', async(req, res) => {
    try{
        const newReservation = new Post({
            email : req.body.email,
            phoneNum : req.body.phoneNum, 
            table : req.body.table,
            date : req.body.date,
            time : req.body.time,
        })
        const saveReservation = await newReservation.save();
        res.json({status : 'Reservation Done successfully', data : saveReservation._id})
    }
    catch(err){
        res.status(403).json({status : 'Unable to create reservation'})
    }
})

router.get('/:id', async(req, res) => {

    const allPost = await Post.findById(req.params.id);

    try{
        res.json({Posts : allPost})
    }
    catch(err){
        res.status(403).json({status : 'Unable to get reservation List'})
    }
})

router.get('/', async(req, res) => {

    const allPost = await Post.find();

    try{
        res.json({Posts : allPost})
    }
    catch(err){
        res.status(403).json({status : 'Unable to get reservation List'})
    }
})

router.put('/edit', async(req, res) => {
    Post.findByIdAndUpdate(req.body.id, {
        $set : {
            email :req.body.email,
            phoneNum : req.body.phoneNum,
            table : req.body.table,
            date : req.body.date,
            time : req.body.time,
        }
    },{
        new : true
    }).exec((err, result) => {
        if(err){
            res.status(403).json({status : 'Unable to Edit the reservation'})
        }
        else{
            res.json({status: result})
        }
    })
})

router.delete('/delete/:id', async(req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, result) => {
        if(err)
            return res.status(403).json({status : 'Unable to Delete a reservation'})
        
        res.json({status : 'Deleted successfully', result})
    })
})


module.exports = router;