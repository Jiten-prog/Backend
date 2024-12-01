import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videos= new Schema({
    videofile:{
        type: String, //cloudinary using
        required: true

    }, thumbnail:{
        type: String, //using cloudinary
        required: true
    },title:{
        type: String, 
        required: true
    }, description:{
        type: String, 
        
    },duration:{
        type: Number, //from cloudinary
        required: true,
    }, owner:[{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
},{Timestamps: true})

videos.plugin(mongooseAggregatePaginate)


export const video = mongoose.model("video",videos)
//till now everything is just the setup