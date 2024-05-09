import mongoose, {Schema} from "mongoose";


const form3Schema = new Schema(
    {
        position: {
            type: String,
            trim: true, 
        },
        organization: {
            type: String,
            trim: true, 
        },
        status: {
            type: String,
            trim: true, 
        },
        dateofjoining: {
            type: String,
            trim: true,
        },
        dateofleaving: {
            type: String,
            trim:true
        },
        duration: {
            type: String,
            trim:true
        },
       
        areasofspecialization: {
            type:String,
            trime: true
        },
        currentareaofresearch: {
            type: String,
            trim: true
        },
        experience: {
            type: String,
            trim: true
        },
        employmenthistory: {
            type: [Schema.Types.Mixed],
            default: []
        },
        teachingexperience: {
            type: [Schema.Types.Mixed],
            default: []
        },
        researchexperience: {
            type: [Schema.Types.Mixed],
            default: []
        },
        industrialexperience: {
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
export const Form3 = mongoose.model("Form3", form3Schema)