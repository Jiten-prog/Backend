import { asynchandler } from "../utils/asynchandler.js";
import { user } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/fileupload.js"

const registeruser= asynchandler(async(req,res)=>{
    //get user data
    //validation(is password correct etc)
    //check if user already exists
    //check for images and avatar
    //upload them on cloudinary
    //check if avatar is in cloudinary
    //create user object- create db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const{name, fullname,email,password}= req.body
    console.log("email:", email)
    console.log("name:",name)
    
    
    if(fullname===""){
        throw new ApiError(400, "full name required")
    }if(name===""){
        throw new ApiError(400, "name required")
    }if(email===""){
        throw new ApiError(400, "email required")
    }if(password===""){
        throw new ApiError(400, "passwordrequired")
    }

  const existinguser=  await user.findOne({  //code to find if the given username or email exists or not
        $or :[{name}, {email}]
    })
    if(existinguser){
        throw new ApiError(409,"User already exists")

    }
    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverimagepath = req.files?.coverimage[0]?.path;
    
   

    if(!avatarlocalpath){
        throw new ApiError(400, "Avatar file required")
    } 

    const avatar = await uploadOnCloudinary(avatarlocalpath) 
   const coverimage = await uploadOnCloudinary(coverimagepath)
    if(!avatar){
    throw new ApiError(400, "Avatar file required")
} 
    //there should be a apierror file in which all errors are already written that we pass through an if statement and it prints an error but we havent created it take it from github
const userstored = await user.create({
    fullname,
    name,
    email,
    avatar: avatar.url,
    coverimage: coverimage?.url || "",
    password
})
const createduser = await user.findById(userstored._id).select("-password -refreshtoken") //code to check if user already exists and to remove password

if (!createduser){
    throw new ApiError(500, "something went wrong")
}

return res.status(201).json(
    new ApiResponse(200, createduser,"user registered successfully")
)
})
// response is sent through api response which is not created so see on github

export {registeruser}
