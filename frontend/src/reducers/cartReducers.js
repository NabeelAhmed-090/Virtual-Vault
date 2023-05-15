import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  EMPTY_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemToAdd = action.payload;
      const itemExists = state.cartItems.find(
        (item) => item.game === itemToAdd.game
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.game === itemExists.game ? itemToAdd : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemToAdd],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.game !== action.payload
        ),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
