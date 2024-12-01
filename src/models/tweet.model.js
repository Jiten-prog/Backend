import mongoose, { Schema } from "mongoose";

const tweet = new Schema({

    content:{
        type:String,
        required:true
    },owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

export const tweets= mongoose.model("tweet", tweet)