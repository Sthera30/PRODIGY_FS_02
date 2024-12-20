import mongoose from "mongoose";



const leaveSchema = mongoose.Schema(

    {

        leaveType: {

            type: String,
            required: false
        },

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employees',
            required: false
        },

        fromDate: {
            type: Date,
            required: false,
            default: Date.now()
        },


        ToDate: {
            type: Date,
            required: false,
            default: Date.now()
        },

        description: {
            type: String,
            required: false
        },

        appliedDate: {
            type: Date,
            required: false,
            default: Date.now()
        },

        status: {
            type: String,
            required: false,
            default: "Pending"
        }

    }

)

export const leaveModel = mongoose.model("leaves", leaveSchema)