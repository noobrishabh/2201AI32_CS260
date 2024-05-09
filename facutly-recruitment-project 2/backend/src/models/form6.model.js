import mongoose, {Schema} from "mongoose";


const form6Schema = new Schema(
    {
        
        
        phdthesissupervision: {
            type: [Schema.Types.Mixed],
            default: []
        },
        mastersdegree: {
            type: [Schema.Types.Mixed],
            default: []
        },
        bachelorsdegree: {
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
export const Form6 = mongoose.model("Form6", form6Schema)