const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://AK2507:Aryan2507@cluster1.vdxxkyt.mongodb.net/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo succesfully");
    })
}

module.exports = connectToMongo;