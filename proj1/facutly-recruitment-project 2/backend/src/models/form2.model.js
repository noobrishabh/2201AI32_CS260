import mongoose, {Schema} from "mongoose";


const form2Schema = new Schema(
    {
        universityinstitute: {
            type: String,
            trim: true, 
        },
        department: {
            type: String,
            trim: true, 
        },
        nameofphdsupervisor: {
            type: String,
            trim: true, 
        },
        yearofjoining: {
            type: String,
            trim: true,
        },
        dateofsuccessfulthesis: {
            type: String,
        },
        dateofaward: {
            type: String,
        },
        titleofphdthesis: {
            type: String, 
        },
        degreecertificateb: {
            type: String,
            trim: true, 
        },
        degreecertificatec: {
            type: String,
            trim: true, 
        },
        universityinstituteb: {
            type: String,
            trim: true, 
        },
        universityinstitutec: {
            type: String,
            trim: true, 
        },
        branchstreamb: {
            type: String,
            trim: true, 
        },
        branchstreamc: {
            type: String,
            trim: true, 
        },
        yearofjoiningb: {
            type: String,
            trim: true, 
        },
        yearofjoiningc: {
            type: String,
            trim: true, 
        },
        yearofcompletionb: {
            type: String,
            trim: true, 
        },
        yearofcompletionc: {
            type: String,
            trim: true, 
        },
        durationb: {
            type: String,
            trim: true, 
        },
        durationc: {
            type: String,
            trim: true, 
        },
        percentageb: {
            type: String,
            trim: true, 
        },
        percentagec: {
            type: String,
            trim: true, 
        },
        divisionb: {
            type: String,
            trim: true, 
        },
        divisionc: {
            type: String,
            trim: true, 
        },
        school12: {
            type: String,
            trim: true, 
        },
        school10: {
            type: String,
            trim: true, 
        },
        yearofpassing12: {
            type: String,
            trim: true, 
        },
        yearofpassing10: {
            type: String,
            trim: true, 
        },
        percentage12: {
            type: String,
            trime: true,
        },
        percentage10: {
            type:String,
            trime: true
        },
        division12: {
            type: String,
            trim: true
        },
        division10: {
            type: String,
            trim: true
        },
        additionaleducationqualification: {
            type: [Schema.Types.Mixed],
            default: []
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)
export const Form2 = mongoose.model("Form2", form2Schema)