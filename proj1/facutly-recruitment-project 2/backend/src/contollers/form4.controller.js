import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form4 } from "../models/form4.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm4 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form4Data = await Form4.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form4Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form4Data, user },
                "User and form4 fetched successfully"
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

const submittingForm4 = asyncHandler(async (req, res) => {
    // console.log(req);
    const { internationaljournalpapers,
        internationalconferencepapers,
        patents,
        bookchapters,
        nationaljournalpapers,
        nationalconferencepapers,
        books,
        url,
        bestpublications,
        patenttable,
        booktable,
        bookchaptertable,
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;
    // console.log(req.body);
    const form4Data = await Form4.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form4Data) {
        await Form4.create({
            internationaljournalpapers:internationaljournalpapers,
            internationalconferencepapers:internationalconferencepapers,
            patents:patents,
            bookchapters:bookchapters,
            nationaljournalpapers:nationaljournalpapers,
            nationalconferencepapers:nationalconferencepapers,
            books:books,
            url:url,
            bestpublications:bestpublications,
            patenttable:patenttable,
            booktable:booktable,
            bookchaptertable:bookchaptertable,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form4 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form4")
        })
    }
    else {
        Form4.findByIdAndUpdate({ _id: form4Data._id }, {
            internationaljournalpapers:internationaljournalpapers,
            internationalconferencepapers:internationalconferencepapers,
            patents:patents,
            bookchapters:bookchapters,
            nationaljournalpapers:nationaljournalpapers,
            nationalconferencepapers:nationalconferencepapers,
            books:books,
            url:url,
            bestpublications:bestpublications,
            patenttable:patenttable,
            booktable:booktable,
            bookchaptertable:bookchaptertable,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form4 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form4 was not able to update")
        })
    }
})

export { submittingForm4, getForm4 }