import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer'
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser=asyncHandler( async (req,res) =>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    // console.log(req.body);
    const {firstname, lastname, email , category, password } = req.body
    // console.log("email: ", email);

    if (
        [firstname, email, lastname , category, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
        // return res.status(400).json(
        //     new ApiResponse(400, {}, "All fields are required")
        // )
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")

    }
    //console.log(req.files);

    
    const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        category: category,
        password: password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
        // return res.status(500).json(
        //     new ApiResponse(500, {}, "Something went wrong while registering the user")
        // )
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, password} = req.body
    console.log(email);

    if (!password && !email) {
        throw new ApiError(400, "password and email is required")
    }
    
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Password is not correct")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        // secure: true
    }
    // res.cookie("access","token");
    // console.log(res.cookies);
    return res 
    .status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken", refreshToken,options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
                // user: res
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            // secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken,options)
        .cookie("refreshToken", newRefreshToken,options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body
    console.log(oldPassword,newPassword);
    const user = await User.findById(req.user?._id)
    console.log(user);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    // console.log(user);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }
    bcrypt.hash(newPassword,10)
            .then(hash=>{
                User.findByIdAndUpdate({_id:user._id},{password:hash}).then((u)=>{
                    // console.log("then");
                    res
                    .status(200)
                    .json(new ApiResponse(200, {}, "Password updated successfully"))
                }).catch((error)=>{
                    throw new ApiError(401, error?.message || "password was not able to update")
                })
            }).catch((error)=>{
                throw new ApiError(401, error?.message || "password was not able to update due to some error at fetching data")
    })    
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const resetUserPassword = asyncHandler(async (req, res) =>{

    const {email} = req.body
    console.log(email);

    if (!email) {
        throw new ApiError(400, "password and email is required")
    }
    
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User with this email does not exist")
    }
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "5m"
        }
    )
   
    const toVisit=`http://localhost:5173/reset-password/${user._id}/${token}`;
    console.log(toVisit);
    const testAccount=await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.email",
        port: 587,
        auth: {
            user: `${process.env.MAIL_ID}`,
            pass: `${process.env.MAIL_PASSWORD}`
        },
      });

      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: `${process.env.MAIL_ID}`, // sender address
          to: `${email}`, // list of receivers TODO: change this email to email provided
          subject: "Here is the link for Resetting your password for the faculty recruitment IIT PATNA website", // Subject line
          text: `${toVisit}`, // plain text body
        });
    }
    main().then(()=>{
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "mailed successfully"
        ))
    }).
    catch((error)=>{
        throw new ApiError(500, "Error in sending the mail");
    })
})

const resetUserPasswordChange = asyncHandler(async (req, res) =>{
    const {id , token}=req.params;
    const {password} = req.body
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            throw new ApiError(409, "Error with token");
        }
        else{
            bcrypt.hash(password,10)
            .then(hash=>{
                User.findByIdAndUpdate({_id:id},{password:hash}).then((u)=>{
                    console.log("then");
                    res
                    .status(200)
                    .json(new ApiResponse(200, {}, "Password updated successfully"))
                }).catch((error)=>{
                    throw new ApiError(401, error?.message || "password was not able to update")
                })
            }).catch((error)=>{
                throw new ApiError(401, error?.message || "password was not able to update due to some error at fetching data")
            })    
        }
    })
})

const isLoggedIn = (req,res) => {
    try {
        // console.log(req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                throw new ApiError(409, "Not Logged In");
            }
            else{
                return res
                .status(200)
                .json(new ApiResponse(200, {}, "User is Logged In"));
            }
        })
    } catch (error) {
        throw new ApiError(401, error)
    }
    
}



export {registerUser,loginUser,logoutUser, isLoggedIn, refreshAccessToken, changeCurrentPassword, getCurrentUser, resetUserPassword, resetUserPasswordChange}