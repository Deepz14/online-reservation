const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    phoneNum : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    table:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('reservation', postSchema);