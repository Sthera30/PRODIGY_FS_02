import mongoose from "mongoose";


const our_servicesSchema = mongoose.Schema(

    {

        ourServiceHeading: {
            type: String,
            required: true
        },

        ourServiceDescription: {
            type: String,
            required: true
        },

        ourServiceImage: {
            type: String,
            required: true
        }
    }
)

export const our_servicesModel = mongoose.model('our_services', our_servicesSchema)

