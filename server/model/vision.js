import mongoose from 'mongoose'


const visionSchema = mongoose.Schema(
    {
         
            visionHeading: {
                type: String,
                required: true
            },

            visionDescription: {
                type: String,
                required: true

            }
        }
)

export const visionModel = mongoose.model('vision', visionSchema)