import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form7 } from "../models/form7.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm7 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form7Data = await Form7.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form7Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form7Data, user },
                "User and form7 fetched successfully"
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

const submittingForm7 = asyncHandler(async (req, res) => {
    // console.log(req);
    const { significantresearch,
        significantteaching,
        relevantinformation,
        professionalservice,
        journalpublications,
        conferencepublications
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    // console.log(req.body);
    const form7Data = await Form7.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form7Data) {
        await Form7.create({
            significantresearch:significantresearch,
            significantteaching:significantteaching,
            relevantinformation:relevantinformation,
            professionalservice:professionalservice,
            journalpublications:journalpublications,
            conferencepublications:conferencepublications,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form7 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form7")
        })
    }
    else {
        Form7.findByIdAndUpdate({ _id: form7Data._id }, {
            significantresearch:significantresearch,
            significantteaching:significantteaching,
            relevantinformation:relevantinformation,
            professionalservice:professionalservice,
            journalpublications:journalpublications,
            conferencepublications:conferencepublications,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form7 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form7 was not able to update")
        })
    }
})

export { submittingForm7, getForm7 }