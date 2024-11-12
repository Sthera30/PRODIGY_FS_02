import mongoose, { get } from "mongoose";


const orderSchema = mongoose.Schema(

    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },

        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addresses',
            required: true
        },

        items: [

            {
                food: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'foods',
                    required: true
                },

                qty: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }

        ],

        totalAmount:
        {
            type: Number,
            required: true
        },

        payment: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ["canceled", "paid"],
            required: true,
            default: "canceled"
        },

        shippingStatus: {
            type: String,
            required: true,
            // enum: ["Not Yet Shipped, Shipped, Delivered"],
            default: "Not Yet Shipped"
        },

        deliveryTimeframe: {
            type: String,
            required: true,
            default: '3 - 5 Working days '
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        shippingDate: {
            type: Date,
            required: true,
            default: Date.now()
        },

        deliveredDate: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

export const orderModel = mongoose.model("orders", orderSchema)


//Do the date thing write it on the backend
//