import mongoose from "mongoose";
import validator from "validator";


const otpSchema = mongoose.Schema(
    {
        otp: {
            type: String,
            required: true
        },

        userEmail: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Invalid email address!"]
        }

    }
)

export const otpModel = mongoose.model('otp', otpSchema)