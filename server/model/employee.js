import mongoose from "mongoose";
import validator from "validator";


const employeeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Invalid email address!"]
    },

    DOB: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    role: {
        type: String, 
        required: false,
        default: "user"
    },

    maritalStatus: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    }

})

export const employeeModel = mongoose.model('employees', employeeSchema)