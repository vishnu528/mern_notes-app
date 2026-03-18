const mongoose = require ('mongoose')

const connectDb = async () => { 
    try{
        await mongoose.connect("mongodb+srv://vishnu:vishnu123@cluster0.jcvonpe.mongodb.net/mydata")
         console.log("mongobd connected successfully") 
    }catch(err) { 
        console.error("DB connection failed",err.message);
    }
}

module.exports = connectDb;