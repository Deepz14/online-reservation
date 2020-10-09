const express = require('express');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const reservation = require('./routes/reservation');
const app = express();

const config = require('./config/key');

const PORT = process.env.PORT || 8080;

const {MONGO_URI} = config

mongoose.connect(MONGO_URI, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true})
.then((result) => {
    app.listen(PORT, () => {
        console.log(`Server Started Running on Port : ${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})

app.use(express.json());

app.use('/user/register', register);

app.use('/admin/login', login);

app.use('/user/reservation', reservation);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}