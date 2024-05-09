import mongoose, {Schema} from "mongoose";

const form1Schema = new Schema(
    {
        advertisementnumber: {
            type: String,
            trim: true, 
        },
        department: {
            type: String,
            trim: true, 
        },
        post: {
            type: String,
            trim: true, 
        },
        firstname: {
            type: String,
            trim: true, 
        },
        lastname: {
            type: String,
            trim: true, 
        },
        dob: {
            type: String,
            trim: true, 
        },
        maritalstatus: {
            type: String,
            trim: true, 
        },
        idproof: {
            type: String,
            trim: true, 
        },
        fathername: {
            type: String,
            trim: true, 
        },
        middlename: {
            type: String,
            trim: true, 
        },
        nationality: {
            type: String,
            trim: true, 
        },
        gender: {
            type: String,
            trim: true, 
        },
        updateidproof: {
            type: String,
            trim: true, 
        },
        updateimage: {
            type: String,
            trim: true, 
        },
        Street: {
            type: String,
            trim: true, 
        },
        City: {
            type: String,
            trim: true, 
        },
        State: {
            type: String,
            trim: true, 
        },
        Country: {
            type: String,
            trim: true, 
        },
        pinzip: {
            type: String,
            trim: true, 
        },
        Street2: {
            type: String,
            trim: true, 
        },
        City2: {
            type: String,
            trim: true, 
        },
        State2: {
            type: String,
            trim: true, 
        },
        Country2: {
            type: String,
            trim: true, 
        },
        pinzip2: {
            type: String,
            trim: true, 
        },
        mobile: {
            type: String,
            trim: true, 
        },
        landlinenumber: {
            type: String,
            trim: true, 
        },
        altmobile: {
            type: String,
            trim: true, 
        },
        alternateemail: {
            type: String,
            unique: true,
            lowercase: true,
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

export const Form1 = mongoose.model("Form1", form1Schema)