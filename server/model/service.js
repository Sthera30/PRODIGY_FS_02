import mongoose from "mongoose";


const promiseSchema = mongoose.Schema(

    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        createdAt: {

            type: Date,
            required: true,
            default: Date.now()
        }

    }

)

export const promiseModel = mongoose.model('promises', promiseSchema)