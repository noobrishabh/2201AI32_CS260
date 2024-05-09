import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form5 } from "../models/form5.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm5 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form5Data = await Form5.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form5Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form5Data, user },
                "User and form5 fetched successfully"
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

const submittingForm5 = asyncHandler(async (req, res) => {
    // console.log(req);
    const { professionalsocieties,
        professionaltraining,
        awardandrecognition,
        sponsoredprojects,
        consultancyprojects,
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    // console.log(req.body);
    const form5Data = await Form5.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form5Data) {
        await Form5.create({
            professionalsocieties:professionalsocieties,
            professionaltraining:professionaltraining,
            awardandrecognition:awardandrecognition,
            sponsoredprojects:sponsoredprojects,
            consultancyprojects:consultancyprojects,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form5 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form5")
        })
    }
    else {
        Form5.findByIdAndUpdate({ _id: form5Data._id }, {
            professionalsocieties:professionalsocieties,
            professionaltraining:professionaltraining,
            awardandrecognition:awardandrecognition,
            sponsoredprojects:sponsoredprojects,
            consultancyprojects:consultancyprojects,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form5 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form5 was not able to update")
        })
    }
})

export { submittingForm5, getForm5 }