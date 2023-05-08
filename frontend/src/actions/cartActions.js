import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const addToCart = (gameId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/games/${gameId}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                game: data.game._id,
                title: data.game.title,
                image: data.game.imagePath,
                price: data.game.price,
                units: data.game.units,
                unitsInCart: qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error)
    }

}