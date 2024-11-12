import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rating: {

            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }

    }

)

const foodSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        weight: {
            type: Number,
            required: true
        },

        reviews: [reviewSchema],

        foodImage: {
            type: String,
            required: true
        },

        specificationName: {
            type: String,
            required: true
        }
        
    }
)

export const foodModel = mongoose.model("foods", foodSchema)
