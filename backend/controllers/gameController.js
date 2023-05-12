import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Game from '../models/gameModel.js'
import Transaction from '../models/transactionModel.js';
import Notification from '../models/notificationModel.js'
import cloudinary from 'cloudinary';

import stripe from 'stripe';
const secretKey = "sk_test_51N5u3tDPl5TQVYXyckgRZlINHANcViDlr6Hp2rtkWSdhOhE1Z5h48JDuzd1dc3dJ3PchUkIib8XXNrdGh0ZXWh5U00ucQxRpcN";
const stripeInstance = stripe(secretKey);

const DOMAIN = 'http://localhost:3000';

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
    const { seller, title, description, price, isGameNew, tags, units } = req.body;
    const image = req.file
    try {
        const cloudinaryResult = await uploadImageToCloudinary(image);

        const stripeProduct = await stripeInstance.products.create({
            name: title,
            images: [cloudinaryResult.secure_url],
        });

        const stripePrice = await stripeInstance.prices.create({
            product: stripeProduct.id,
            unit_amount: price * 100,
            currency: 'pkr',
        });

        const newGame = new Game({
            seller: seller,
            title: title,
            description: description,
            price: price,
            isGameNew: isGameNew,
            tags: tags,
            units: units,
            imagePath: cloudinaryResult.secure_url,
            stripeProductId: stripeProduct.id,
            stripePriceId: stripePrice.id,
        });

        const savedGame = await newGame.save();
        res.status(200).json({ game: savedGame });
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


const checkoutSession = asyncHandler(async (req, res) => {
    const { cartItems, total } = req.body;
    const line_items = cartItems.map(item => {
        return {
            price: item.stripePriceId,
            quantity: item.unitsInCart
        }
    })

    const session = await stripeInstance.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}?canceled=true`,
    });

    res.json({
        url: session.url
    })
});


const updateGameStatus = asyncHandler(async (req, res) => {
    const { user } = req.body
    const sessionID = req.params.id; // Get the session ID from the query parameters
    try {
        var totalUnits = 0;
        var totalAmount = 0;
        const productIDs = await new Promise((resolve, reject) => {
            stripeInstance.checkout.sessions.listLineItems(
                sessionID,
                (err, lineItems) => {
                    if (err) {
                        reject(err);
                    } else {
                        const productIDs = lineItems.data.map((lineItem) => {
                            totalUnits += lineItem.quantity;
                            totalAmount += lineItem.amount_total / 100;
                            return (
                                {
                                    id: lineItem.price.product,
                                    units: lineItem.quantity,
                                    amount: lineItem.amount_total / 100
                                }
                            )
                        });
                        resolve(productIDs);
                    }
                }
            );
        });

        const gameIds = []
        const unitList = []
        const priceList = []

        const sellerIds = []
        const allGames = await Game.find()
        allGames.forEach((game) => {
            productIDs.forEach((product) => {
                if (game.stripeProductId === product.id) {
                    sellerIds.push(game.seller)
                    gameIds.push(game._id)
                    unitList.push(product.units)
                    priceList.push(product.amount)
                    game.units -= product.units
                    game.save()
                }
            })
        })

        const newTransaction = new Transaction({
            buyer: user,
            games: gameIds,
            units: unitList,
            price: priceList,
        })

        sellerIds.map(async (sellerId, index) => {
            const newNotification = new Notification({
                user: sellerId,
                message: String(unitList[index]) + " units of game Sold",
                unread: true,
                link: "hello"
            })
            await newNotification.save()
        })

        await newTransaction.save()
        res.json({
            productIDs: productIDs,
            totalUnits: totalUnits,
            totalAmount: totalAmount
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving product IDs.');
    }
})

export { createGame, getGame, getUserGames, deleteGame, searchGames, checkoutSession, updateGameStatus }
