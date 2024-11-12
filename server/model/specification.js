import mongoose from "mongoose";


const specificationSchema = mongoose.Schema(

    {
        food: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "foods"
        },

        specificationName: {
            type: String,
            required: true
        }
    }

)


export const specificationModel = mongoose.model("specifications", specificationSchema)
