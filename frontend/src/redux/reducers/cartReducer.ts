import { actionTypes } from "../actionTypes";

const cartItemsFromStorage: CartItem[] | [] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || "[]")
  : [];

const initialState: CartState = {
  cartItems: cartItemsFromStorage,
};

const cartReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product === payload.item
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existItem.product ? payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
