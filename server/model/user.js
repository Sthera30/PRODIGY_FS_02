import mongoose from "mongoose";
import validator from "validator";


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {

            type: String,
            required: true,
            validate: [validator.isEmail, 'Invalid email address!']
        },

        role: {
            type: String,
            required: true,
            default: 'user'
        },

        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },

        password: {
            type: String,
            required: true
        },

        confirmPassword: {
            type: String,
            required: true
        }
    }

)

export const userModel = mongoose.model('users', userSchema)