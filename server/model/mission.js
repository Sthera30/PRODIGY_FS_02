import mongoose from 'mongoose'


const missionSchema = mongoose.Schema(
    {
         
            missionHeading: {
                type: String,
                required: true
            },

            missionDescription: {
                type: String,
                required: true

            }
        }
)

export const missionModel = mongoose.model('mission', missionSchema)