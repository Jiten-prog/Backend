import mongoose, { mongo, Schema } from "mongoose";

const like = new Schema({
    tweet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tweet"
    }
},{timestamps:true})

export const likes=mongoose.model("like",like)