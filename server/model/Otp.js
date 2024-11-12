import mongoose from "mongoose";
import validator from "validator";


const otpSchema = mongoose.Schema(

    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email!"]
        },

        otp: {
            type: String,
        },

        Is_verified: {

            type: Boolean,
            required: true,
            default: false
        },

        expiration: {
            type: Date,
            required: true
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }

    }

)

export const otpModel = mongoose.model('otp', otpSchema)