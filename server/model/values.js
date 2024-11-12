import mongoose from 'mongoose'


const valuesSchema = mongoose.Schema(
    {
         
            valuesHeading: {
                type: String,
                required: true
            },

            valuesDescription: {
                type: String,
                required: true

            }
        }
)

export const valuesModel = mongoose.model('values', valuesSchema)