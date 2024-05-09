import mongoose, {Schema} from "mongoose";

const form8Schema = new Schema(
    {
        researchpapers: {
            type: String,
            trim: true, 
        },
        phdcertificate: {
            type: String,
            trim: true, 
        },
        pgdocument: {
            type: String,
            trim: true, 
        },
        ugdocument: {
            type: String,
            trim: true, 
        },
        twelvedocument: {
            type: String,
            trim: true, 
        },
        tendocument: {
            type: String,
            trim: true, 
        },
        payslip: {
            type: String,
            trim: true, 
        },
        undertaking: {
            type: String,
            trim: true, 
        },
        phdexperience: {
            type: String,
            trim: true, 
        },
        anyotherdocument: {
            type: String,
            trim: true, 
        },
        signature: {
            type: String,
            trim: true, 
        },
        name1: {
            type: String,
            trim: true, 
        },
        name2: {
            type: String,
            trim: true, 
        },
        name3: {
            type: String,
            trim: true, 
        },
        position1: {
            type: String,
            trim: true, 
        },
        position2: {
            type: String,
            trim: true, 
        },
        position3: {
            type: String,
            trim: true, 
        },
        association1: {
            type: String,
            trim: true, 
        },
        association2: {
            type: String,
            trim: true, 
        },
        association3: {
            type: String,
            trim: true, 
        },
        institution1: {
            type: String,
            trim: true, 
        },
        institution2: {
            type: String,
            trim: true, 
        },
        institution3: {
            type: String,
            trim: true, 
        },
        email1: {
            type: String,
            trim: true, 
        },
        email2: {
            type: String,
            trim: true, 
        },
        email3: {
            type: String,
            trim: true, 
        },
        contact1: {
            type: String,
            trim: true, 
        },
        contact2: {
            type: String,
            trim: true,
        },
        contact3: {
            type: String,
            trim: true,
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

export const Form8 = mongoose.model("Form8", form8Schema)