import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Game from '../models/gameModel.js'
import cloudinary from 'cloudinary';


// function to upload image to cloudinary
async function uploadImageToCloudinary(image) {
    try {
        const result = await cloudinary.uploader.upload(image.path);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading image to Cloudinary');
    }
}

// @desc POST games
// @route POST /api/games/create
// @access Public

const createGame = asyncHandler(async (req, res) => {
    const { seller, title, description, price, isGameNew, tags } = req.body;
    const image = req.file
    try {
        const cloudinaryResult = await uploadImageToCloudinary(image);

        const newGame = new Game({
            seller: seller,
            title: title,
            description: description,
            price: price,
            isGameNew: isGameNew,
            tags: tags,
            imagePath: cloudinaryResult.secure_url
        });

        const savedGame = await newGame.save();
        res.status(201).json({ game: savedGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// @desc Get Game
// @route Get /api/games/:id
// @access Public

const getGame = asyncHandler(async (req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        if (game) {
            res.send(game)
        }
        else {
            res.status(404)
            throw new Error("Game not found")
        }
    } catch (error) {
        res.status(404)
        res.json({
            error: error,
            message: "Game not found"
        })
    }
})


// @desc Get User Games
// @route Get /api/games/user_games
// @access Public

const getUserGames = asyncHandler(async (req, res) => {
    const seller = req.params.seller
    try {
        const games = await Game.find({ seller })
        if (games) {
            res.send({ userGames: games })
        }
        else {
            res.status(404)
            res.send(null)
        }
    } catch (error) {
        res.status(404)
        res.json({
            error: error,
            message: "Error in fetching games"
        })
    }
})

// @desc DELETE Game
// @route Get /api/games/delete/:id
// @access Public

const deleteGame = asyncHandler(async (req, res) => {
    try {
        await Game.deleteOne({ _id: req.params.id })
        res.status(200)
        res.json({
            success: true,
            message: "Game Deleted Successfully"
        })
    } catch (error) {
        res.status(404)
        res.json({
            success: false,
            error: error,
            message: "Game not found"
        })
    }
})


export { createGame, getGame, getUserGames, deleteGame }
