import mongoose from "mongoose";



const salarySchema = mongoose.Schema(

    {

        departmentId: {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'departments',
            required: true
        },

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employees',
            required: true
        },


        salary: {
            type: Number,
            required: true
        },

        allowance: {
            type: Number,
            required: true
        },

        deduction: {
            type: Number,
            required: true
        },

        paymentDate: {
            type: Date,
            required: true,
            default: Date.now()
        }

    }

)

export const salaryModel = mongoose.model("salaries", salarySchema)