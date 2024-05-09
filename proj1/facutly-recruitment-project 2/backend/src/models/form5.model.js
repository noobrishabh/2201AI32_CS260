import mongoose, {Schema} from "mongoose";


const form5Schema = new Schema(
    {
        
        
        professionalsocieties: {
            type: [Schema.Types.Mixed],
            default: []
        },
        professionaltraining: {
            type: [Schema.Types.Mixed],
            default: []
        },
        awardandrecognition: {
            type: [Schema.Types.Mixed],
            default: []
        },
        sponsoredprojects: {
            type: [Schema.Types.Mixed],
            default: []
        },
        consultancyprojects: {
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
export const Form5 = mongoose.model("Form5", form5Schema)