import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Game from '../models/gameModel.js'
import cloudinary from 'cloudinary';
import { ObjectId } from 'mongodb';


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
        const seller = await User.findById(game.seller)
        if (game && seller) {
            res.send({
                game: game,
                seller: {
                    userName: seller.userName,
                    city: seller.city
                }
            })
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


// @desc Get Search Games
// @route Get /api/search
// @access Public

const searchGames = asyncHandler(async (req, res) => {
    const { pageSize, pageNumber, searchText, userId, isSearching, tags } = req.body;
    try {
        const unfilteredGames = await Game.find()
        if (isSearching) {
            if (unfilteredGames) {
                unfilteredGames.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp())
                const games = unfilteredGames.filter(game => game.seller.toString() != userId)
                if (searchText === "") {
                    const startIndex = (pageNumber - 1) * pageSize;
                    const endIndex = pageNumber * pageSize;
                    const totalGames = games.length;
                    res.send(
                        {
                            searchGames: games.slice(startIndex, endIndex),
                            remainingGames: totalGames - endIndex,
                            remainingPages: Math.ceil((totalGames - endIndex) / pageSize)
                        }
                    )
                } else {
                    const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchText.toLowerCase()))
                    const startIndex = (pageNumber - 1) * pageSize;
                    const endIndex = pageNumber * pageSize;
                    const totalGames = filteredGames.length;
                    res.send(
                        {
                            searchGames: filteredGames.slice(startIndex, endIndex),
                            remainingGames: totalGames - endIndex,
                            remainingPages: Math.ceil((totalGames - endIndex) / pageSize)
                        }
                    )
                }

            } else {
                res.json({
                    error: error,
                    message: "Error in fetching games"
                })
            }
        } else {
            if (unfilteredGames) {
                const games = unfilteredGames.filter(game => game.seller.toString() != userId)
                const filteredGames = games.filter(game => {
                    for (let tag of tags) {
                        if (game.tags[0].split(',').includes(String(tag))) {
                            return true;
                        }
                    }
                    return false;
                });
                filteredGames.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp())
                const startIndex = (pageNumber - 1) * pageSize;
                const endIndex = pageNumber * pageSize;
                const totalGames = filteredGames.length;
                res.send(
                    {
                        searchGames: filteredGames.slice(startIndex, endIndex),
                        remainingGames: totalGames - endIndex,
                        remainingPages: Math.ceil((totalGames - endIndex) / pageSize)
                    }
                )
            } else {
                res.json({
                    error: error,
                    message: "Error in fetching games"
                })
            }
        }
    } catch (error) {
        res.json({
            error: error,
            message: "Error in fetching games"
        })
    }
})


export { createGame, getGame, getUserGames, deleteGame, searchGames }
