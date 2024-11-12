import mongoose from 'mongoose'
import validator from 'validator'


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email!"]
    },

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (el) {

                return (el) => el === this.password

            }
        }
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    otp: {
        type: String
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImage: {
        type: String,
        required: false
    },

    country: {
        type: String,
        required: false
    },

    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },

    zipCode: {
        type: Number,
        required: false
    },


})

const userModel = mongoose.model("users", userSchema)

export default userModel

//country, city, state, ZipCode, 