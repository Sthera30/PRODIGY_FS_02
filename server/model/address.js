import mongoose from "mongoose";


const addressSchema = mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        suburb: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        buildingAddress: {
            type: String,
            required: false
        },

        province: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        postalCode: {
            type: Number,
            required: true
        }

    }

)

export const addressModel = mongoose.model("addresses", addressSchema)