import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form1 } from "../models/form1.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm1 = asyncHandler(async (req, res) => {
    const user=req.user;
    const form1Data = await Form1.findOne({ owner:user._id });
    // console.log(form1Data);
    if(form1Data){
        return res.status(200)
                .json(new ApiResponse(
                    200,
                    {form1Data,user},
                    "User and form1 fetched successfully"
                ))
    }
    else{
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {user},
            "User fetched successfully"
        ))
    }
})

const submittingForm1 = asyncHandler(async (req, res) => {
    const { advertisementnumber,
        department,
        post,
        firstname,
        lastname,
        dob,
        maritalstatus,
        idproof,
        fathername,
        middlename,
        nationality,
        gender,
        Street,
        City,
        State,
        Country,
        pinzip,
        Street2,
        City2,
        State2,
        Country2,
        pinzip2,
        mobile,
        altmobile,
        landlinenumber,
        alternateemail
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    let image='';
    let idphoto='';
    if(req.files){
        if(req.files.updateimage){
            const updateimage = req.files.updateimage[0]?.path;
            image = await uploadOnCloudinary(updateimage)
        }
        if(req.files.updateidproof){
            const updateidproof = req.files.updateidproof[0]?.path;
            idphoto= await uploadOnCloudinary(updateidproof)
        }
    }

    // console.log(req.files);

    // console.log(updateimage,updateidproof);
    const form1Data = await Form1.findOne({ owner:user._id });
    // console.log(!form1Data);
    if (!form1Data) {
        await Form1.create({
            advertisementnumber: advertisementnumber,
            department: department,
            post: post,
            firstname: firstname,
            lastname: lastname,
            dob:dob,
            maritalstatus:maritalstatus,
            idproof:idproof,
            fathername:fathername,
            middlename:middlename,
            nationality:nationality,
            gender:gender,
            updateidproof:idphoto.url,
            updateimage:image.url,
            Street:Street,
            City:City,
            State:State,
            Country:Country,
            pinzip:pinzip,
            Street2:Street2,
            City2:City2,
            State2:State2,
            Country2:Country2,
            pinzip2:pinzip2,
            mobile:mobile,
            altmobile:altmobile,
            landlinenumber:landlinenumber,
            alternateemail:alternateemail,
            owner:user._id
        }).then((u)=>{
            res.status(201).json(
                new ApiResponse(200, {}, "Form1 created Successfully")
            )
        }).catch((error)=>{
            throw new ApiError(500, "Something went wrong while creating the form1")
        })
    }
    else {
        Form1.findByIdAndUpdate({_id:form1Data._id},{
            advertisementnumber: advertisementnumber,
            department: department,
            post: post,
            firstname: firstname,
            lastname: lastname,
            dob:dob,
            maritalstatus:maritalstatus,
            idproof:idproof,
            fathername:fathername,
            middlename:middlename,
            nationality:nationality,
            gender:gender,
            updateidproof:idphoto.url,
            updateimage:image.url,
            Street:Street,
            City:City,
            State:State,
            Country:Country,
            pinzip:pinzip,
            Street2:Street2,
            City2:City2,
            State2:State2,
            Country2:Country2,
            pinzip2:pinzip2,
            mobile:mobile,
            altmobile:altmobile,
            landlinenumber:landlinenumber,
            alternateemail:alternateemail
            }).then((u)=>{
            res
            .status(200)
            .json(new ApiResponse(200,{}, "Form1 updated successfully"))
        }).catch((error)=>{
            throw new ApiError(401, error?.message || "Form1 was not able to update")
        })
    }
})

export { submittingForm1, getForm1 }