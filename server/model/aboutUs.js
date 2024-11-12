import mongoose from 'mongoose'


const aboutUsSchema = mongoose.Schema(
    {
        aboutUsHeading: {
            type: String,
            required: true
        },

        aboutUsDescription: {
            type: String,
            required: true
        },

        aboutUsImage: {
            type: String,
            required: true
        }
    }
)

export const aboutUsModel = mongoose.model('aboutUs', aboutUsSchema)