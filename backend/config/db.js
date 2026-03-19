const mongoose = require ('mongoose')

const connectDb = async () => { 
    try{
        await mongoose.connect(process.env.MONGO_URL)
         console.log("mongobd connected successfully") 
    }catch(err) { 
        console.error("DB connection failed",err.message);
    }
}

module.exports = connectDb;