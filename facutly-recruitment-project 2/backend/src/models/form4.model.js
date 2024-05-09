import mongoose, {Schema} from "mongoose";


const form4Schema = new Schema(
    {
        internationaljournalpapers: {
            type: String,
            trim: true, 
        },
        internationalconferencepapers: {
            type: String,
            trim: true, 
        },
        patents: {
            type: String,
            trim: true, 
        },
        bookchapters: {
            type: String,
            trim: true,
        },
        nationaljournalpapers: {
            type: String,
            trim:true
        },
        nationalconferencepapers: {
            type: String,
            trim:true
        },
        books: {
            type: String,
            trim:true
        },
        url: {
            type: String,
            trim:true
        },
       
        
        bestpublications: {
            type: [Schema.Types.Mixed],
            default: []
        },
        patenttable: {
            type: [Schema.Types.Mixed],
            default: []
        },
        booktable: {
            type: [Schema.Types.Mixed],
            default: []
        },
        bookchaptertable: {
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
export const Form4 = mongoose.model("Form4", form4Schema)