const express = require("express");
const mongoose = require("mongoose");
const cors = require ("cors");
const app = express();
const connectDb = require("./config/db");
const authRoutes = require ("./route/authRoutes")
const noteRouter = require ("./route/noteRoutes");
require('dotenv').config();
app.use(cors());
app.use(express.json());
connectDb();



app.use("/api/auth",authRoutes);
app.use("/api",noteRouter)


 

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}` );
})
