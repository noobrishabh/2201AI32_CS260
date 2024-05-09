import mongoose, {Schema} from "mongoose";


const form7Schema = new Schema(
    {
        
        
        significantresearch: {
            type: String,
            trim: true
        },
        significantteaching: {
            type: String,
            trim: true
        },
        relevantinformation: {
            type: String,
            trim: true
        },
        professionalservice: {
            type: String,
            trim: true
        },
        journalpublications: {
            type: String,
            trim: true
        },
        conferencepublications: {
            type: String,
            trim: true
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
export const Form7 = mongoose.model("Form7", form7Schema)