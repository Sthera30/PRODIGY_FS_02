import mongoose from "mongoose";


const departmentSchema = mongoose.Schema(

    {

        departmentName: {
            type: String,
            required: true
        },

    }

)

export const departmentModel = mongoose.model("departments", departmentSchema)