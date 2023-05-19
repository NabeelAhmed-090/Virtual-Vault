import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, EMPTY_CART } from '../constants/cartConstants';

export const addToCart = (gameId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/games/${gameId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        game: data.game._id,
        title: data.game.title,
        image: data.game.imagePath,
        price: data.game.price,
        units: data.game.units,
        stripePriceId: data.game.stripePriceId,
        stripeProductId: data.game.stripeProductId,
        unitsInCart: qty
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (gameId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: gameId
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_CART,
    payload: null
  });
  localStorage.setItem('cartItems', []);
};
