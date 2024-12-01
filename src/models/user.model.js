import mongoose from "mongoose";
import { Schema } from "mongoose";

import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const users= new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        index:true
    },email:{
        type: String,
        required: true,
        unique: true,
        
    },fullname:{
        type: String,
        required: true,
        index: true
    },avatar:{
        type: String, //using cloudinary
        
        
    },coverimage:{
        type: String, //cloudinary url 
        
        
        
    },watchhistory:[{
        type: Schema.Types.ObjectId,
        ref: "video"
    }],password:{
        type: String,
        required: true
    },refreshtoken:{
        type: String
    }
},{timestamps:true})
users.pre("save", async function(next){  // code to encrypt the password
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password, 8)
     next()
})
users.methods.generateaccesstoken = function(){
   return jwt.sign({
        _id: this._id,
        name: this.name,
    fullname: this.fullname,
    password: this.password
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
users.methods.generaterefreshtoken = function(){
    return jwt.sign({
        _id: this._id,
        
    }, process.env.REFRESH_TOKEN,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const user = mongoose.model("user", users)

//till now everything is just the setup

