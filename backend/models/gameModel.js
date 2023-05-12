import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    units: {
        type: Number,
        required: true,
        default: 1
    },
    title: {
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
    isGameNew: {
        type: Boolean,
        default: true,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    stripeProductId: {
        type: String,
        required: true,
        default: ""
    },
    stripePriceId: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export default Game