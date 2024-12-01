// connecting database
import { app } from "./app.js";
import mongoose from "mongoose";
import { db_name } from "./constant.js";
import dotenv from "dotenv";


dotenv.config({
    path:"./env"
})


const connectdb=async ()=>{
try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
    app.on("error",(error)=>{
        console.log("there is an error:", error)
    })
    app.listen(process.env.PORT, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })
} catch (error) {
    console.log("error:", error)
}
}

connectdb()
// till now everything is just setup