import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form3 } from "../models/form3.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm3 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form3Data = await Form3.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form3Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form3Data, user },
                "User and form3 fetched successfully"
            ))
    }
    else {
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { user },
                "User fetched successfully"
            ))
    }
})

const submittingForm3 = asyncHandler(async (req, res) => {
    console.log(req);
    const { position,
        organization,
        status,
        dateofjoining,
        dateofleaving,
        duration,
        areasofspecialization,
        currentareaofresearch,
        experience,
        employmenthistory,
        teachingexperience,
        researchexperience,
        industrialexperience
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    console.log(req.body);
    const form3Data = await Form3.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form3Data) {
        await Form3.create({
            position:position,
            organization:organization,
            status:status,
            dateofjoining:dateofjoining,
            dateofleaving:dateofleaving,
            duration:duration,
            areasofspecialization:areasofspecialization,
            currentareaofresearch:currentareaofresearch,
            experience:experience,
            employmenthistory:employmenthistory,
            teachingexperience:teachingexperience,
            researchexperience:researchexperience,
            industrialexperience:industrialexperience,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form3 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form3")
        })
    }
    else {
        Form3.findByIdAndUpdate({ _id: form3Data._id }, {
            position:position,
            organization:organization,
            status:status,
            dateofjoining:dateofjoining,
            dateofleaving:dateofleaving,
            duration:duration,
            areasofspecialization:areasofspecialization,
            currentareaofresearch:currentareaofresearch,
            experience:experience,
            employmenthistory:employmenthistory,
            teachingexperience:teachingexperience,
            researchexperience:researchexperience,
            industrialexperience:industrialexperience,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form3 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form3 was not able to update")
        })
    }
})

export { submittingForm3, getForm3 }