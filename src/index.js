// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { DB_NAME } from "./constants.js";

dotenv.config({
    path: './env'
})

connectDb()






















// import express from "express";
// const app = express()
// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("errror", () => {
//             console.log("ERROR: ", err);
//             throw err
//         }) 

//         app.listen(process.env.PORT, () => {
//             console.log(`app is listening on port${process.env.PORT}`)
//         })

//     }catch(err){
//         console.log("ERROR: ", err)
//         throw err
//     }
// } )()