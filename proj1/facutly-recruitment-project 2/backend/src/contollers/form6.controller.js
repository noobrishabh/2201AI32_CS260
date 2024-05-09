import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form6 } from "../models/form6.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm6 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form6Data = await Form6.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form6Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form6Data, user },
                "User and form6 fetched successfully"
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

const submittingForm6 = asyncHandler(async (req, res) => {
    // console.log(req);
    const { phdthesissupervision,
        mastersdegree,
        bachelorsdegree,
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    // console.log(req.body);
    const form6Data = await Form6.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form6Data) {
        await Form6.create({
            phdthesissupervision:phdthesissupervision,
            mastersdegree:mastersdegree,
            bachelorsdegree:bachelorsdegree,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form6 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form6")
        })
    }
    else {
        Form6.findByIdAndUpdate({ _id: form6Data._id }, {
            phdthesissupervision:phdthesissupervision,
            mastersdegree:mastersdegree,
            bachelorsdegree:bachelorsdegree,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form6 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form6 was not able to update")
        })
    }
})

export { submittingForm6, getForm6 }