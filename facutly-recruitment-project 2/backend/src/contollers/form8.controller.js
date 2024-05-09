import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form8 } from "../models/form8.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm8 = asyncHandler(async (req, res) => {
    const user=req.user;
    const form8Data = await Form8.findOne({ owner:user._id });
    // console.log(form1Data);
    if(form8Data){
        return res.status(200)
                .json(new ApiResponse(
                    200,
                    {form8Data,user},
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

const submittingForm8 = asyncHandler(async (req, res) => {
    const { 
        name1,
        name2,
        name3,
        position1,
        position2,
        position3,
        association1,
        association2,
        association3,
        institution1,
        institution2,
        institution3,
        email1,
        email2,
        email3,
        contact1,
        contact2,
        contact3,
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    let rp='';
    let pc='';
    let pg='';
    let ug='';
    let tw='';
    let ten='';
    let pay='';
    let un='';
    let pe='';
    let any='';
    let sign='';
    // console.log(req.files);
    if(req.files){
        if(req.files.researchpapers){
            const researchpapers = req.files.researchpapers[0]?.path;
            rp = await uploadOnCloudinary(researchpapers);
        }
        if(req.files.phdcertificate){
            const phdcertificate = req.files.phdcertificate[0]?.path;
            pc= await uploadOnCloudinary(phdcertificate)
        }
        if(req.files.pgdocument){
            const pgdocument = req.files.pgdocument[0]?.path;
            pg= await uploadOnCloudinary(pgdocument)
        }
        if(req.files.ugdocument){
            const ugdocument = req.files.ugdocument[0]?.path;
            ug= await uploadOnCloudinary(ugdocument)
        }
        if(req.files.twelvedocument){
            const twelvedocument = req.files.twelvedocument[0]?.path;
            tw= await uploadOnCloudinary(twelvedocument)
        }
        if(req.files.tendocument){
            const tendocument = req.files.tendocument[0]?.path;
            ten= await uploadOnCloudinary(tendocument)
        }
        if(req.files.payslip){
            const payslip = req.files.payslip[0]?.path;
            pay= await uploadOnCloudinary(payslip)
        }
        if(req.files.undertaking){
            const undertaking = req.files.undertaking[0]?.path;
            un= await uploadOnCloudinary(undertaking)
        }
        if(req.files.phdexperience){
            const phdexperience = req.files.phdexperience[0]?.path;
            pe= await uploadOnCloudinary(phdexperience)
        }
        if(req.files.anyotherdocument){
            const anyotherdocument = req.files.anyotherdocument[0]?.path;
            any= await uploadOnCloudinary(anyotherdocument)
        }
        if(req.files.signature){
            const signature = req.files.signature[0]?.path;
            sign= await uploadOnCloudinary(signature)
        }
    }

    // console.log(req.files);

    // console.log(updateimage,updateidproof);
    const form8Data = await Form8.findOne({ owner:user._id });
    // console.log(!form1Data);
    if (!form8Data) {
        await Form8.create({
            name1: name1,
            name2: name2,
            name3: name3,
            position1: position1,
            position2: position2,
            position3:position3,
            association1:association1,
            association2:association2,
            association3:association3,
            institution1:institution1,
            institution2:institution2,
            institution3:institution3,
            researchpapers:rp.url,
            phdcertificate:pc.url,
            pgdocument:pg.url,
            ugdocument:ug.url,
            twelvedocument:tw.url,
            tendocument:ten.url,
            payslip:pay.url,
            undertaking:un.url,
            phdexperience:pe.url,
            anyotherdocument:any.url,
            signature:sign.url,
            email1:email1,
            email2:email2,
            email3:email3,
            contact1:contact1,
            contact2:contact2,
            contact3:contact3,
            owner:user._id
        }).then((u)=>{
            res.status(201).json(
                new ApiResponse(200, {}, "Form8 created Successfully")
            )
        }).catch((error)=>{
            throw new ApiError(500, "Something went wrong while creating the form8")
        })
    }
    else {
        Form8.findByIdAndUpdate({_id:form8Data._id},{
            name1: name1,
            name2: name2,
            name3: name3,
            position1: position1,
            position2: position2,
            position3:position3,
            association1:association1,
            association2:association2,
            association3:association3,
            institution1:institution1,
            institution2:institution2,
            institution3:institution3,
            researchpapers:rp.url,
            phdcertificate:pc.url,
            pgdocument:pg.url,
            ugdocument:ug.url,
            twelvedocument:tw.url,
            tendocument:ten.url,
            payslip:pay.url,
            undertaking:un.url,
            phdexperience:pe.url,
            anyotherdocument:any.url,
            signature:sign.url,
            email1:email1,
            email2:email2,
            email3:email3,
            contact1:contact1,
            contact2:contact2,
            contact3:contact3,
            }).then((u)=>{
            res
            .status(200)
            .json(new ApiResponse(200,{}, "Form8 updated successfully"))
        }).catch((error)=>{
            throw new ApiError(401, error?.message || "Form8 was not able to update")
        })
    }
})

export { submittingForm8, getForm8 }