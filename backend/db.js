const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' });



const mongoURI = process.env.REACT_APP_SECRET_KEY;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo succesfully");
    })
}

module.exports = connectToMongo;