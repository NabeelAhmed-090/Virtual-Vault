import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
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
    isNew: {
        type: Boolean,
        default: true,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export default Game