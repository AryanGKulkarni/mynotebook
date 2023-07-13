const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://***:***@cluster1.vdxxkyt.mongodb.net/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo succesfully");
    })
}

module.exports = connectToMongo;