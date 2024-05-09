import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Form2 } from "../models/form2.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const getForm2 = asyncHandler(async (req, res) => {
    const user = req.user;
    const form2Data = await Form2.findOne({ owner: user._id });
    // console.log(form1Data);
    if (form2Data) {
        return res.status(200)
            .json(new ApiResponse(
                200,
                { form2Data, user },
                "User and form2 fetched successfully"
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

const submittingForm2 = asyncHandler(async (req, res) => {
    console.log(req);
    const { universityinstitute,
        department,
        nameofphdsupervisor,
        yearofjoining,
        dateofsuccessfulthesis,
        dateofaward,
        titleofphdthesis,
        degreecertificateb,
        degreecertificatec,
        universityinstituteb,
        universityinstitutec,
        branchstreamb,
        branchstreamc,
        yearofjoiningb,
        yearofjoiningc,
        yearofcompletionb,
        yearofcompletionc,
        durationb,
        durationc,
        percentageb,
        percentagec,
        divisionb,
        divisionc,
        school12,
        school10,
        yearofpassing12,
        yearofpassing10,
        percentage12,
        percentage10,
        division12,
        division10,
        additionaleducationqualification,
    } = req.body;
    // console.log(req.body);
    // console.log(req.user);
    const user = req.user;

    const form2Data = await Form2.findOne({ owner: user._id });
    // console.log(!form1Data);
    if (!form2Data) {
        await Form2.create({
            universityinstitute:universityinstitute,
            department:department,
            nameofphdsupervisor:nameofphdsupervisor,
            yearofjoining:yearofjoining,
            dateofsuccessfulthesis:dateofsuccessfulthesis,
            dateofaward:dateofaward,
            titleofphdthesis:titleofphdthesis,
            degreecertificateb:degreecertificateb,
            degreecertificatec:degreecertificatec,
            universityinstituteb:universityinstituteb,
            universityinstitutec:universityinstitutec,
            branchstreamb:branchstreamb,
            branchstreamc:branchstreamc,
            yearofjoiningb:yearofjoiningb,
            yearofjoiningc:yearofjoiningc,
            yearofcompletionb:yearofcompletionb,
            yearofcompletionc:yearofcompletionc,
            durationb:durationb,
            durationc:durationc,
            percentageb:percentageb,
            percentagec:percentagec,
            divisionb:divisionb,
            divisionc:divisionc,
            school12:school12,
            school10:school10,
            yearofpassing12:yearofpassing12,
            yearofpassing10:yearofpassing10,
            percentage12:percentage12,
            percentage10:percentage10,
            division12:division12,
            division10:division10,
            additionaleducationqualification:additionaleducationqualification,
            owner: user._id
        }).then((u) => {
            res.status(201).json(
                new ApiResponse(200, {}, "Form2 created Successfully")
            )
        }).catch((error) => {
            throw new ApiError(500, "Something went wrong while creating the form2")
        })
    }
    else {
        Form2.findByIdAndUpdate({ _id: form2Data._id }, {
            universityinstitute:universityinstitute,
            department:department,
            nameofphdsupervisor:nameofphdsupervisor,
            yearofjoining:yearofjoining,
            dateofsuccessfulthesis:dateofsuccessfulthesis,
            dateofaward:dateofaward,
            titleofphdthesis:titleofphdthesis,
            degreecertificateb:degreecertificateb,
            degreecertificatec:degreecertificatec,
            universityinstituteb:universityinstituteb,
            universityinstitutec:universityinstitutec,
            branchstreamb:branchstreamb,
            branchstreamc:branchstreamc,
            yearofjoiningb:yearofjoiningb,
            yearofjoiningc:yearofjoiningc,
            yearofcompletionb:yearofcompletionb,
            yearofcompletionc:yearofcompletionc,
            durationb:durationb,
            durationc:durationc,
            percentageb:percentageb,
            percentagec:percentagec,
            divisionb:divisionb,
            divisionc:divisionc,
            school12:school12,
            school10:school10,
            yearofpassing12:yearofpassing12,
            yearofpassing10:yearofpassing10,
            percentage12:percentage12,
            percentage10:percentage10,
            division12:division12,
            division10:division10,
            additionaleducationqualification:additionaleducationqualification,
        }).then((u) => {
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Form2 updated successfully"))
        }).catch((error) => {
            throw new ApiError(401, error?.message || "Form2 was not able to update")
        })
    }
})

export { submittingForm2, getForm2 }