import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
app.use(cors())

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
//till now evrythihg i s just eh setup

//routes import this has to be done like this only

import userRouter from "./routes/user.js" ; // given a customm name userrouter, it works like this only
 //router declaration
 app.use("/api/v1/users",userRouter)


export  {app};
