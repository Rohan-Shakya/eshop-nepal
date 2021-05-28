import { actionTypes } from "../actionTypes";

const cartItemsFromStorage: CartItem[] | [] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || "[]")
  : [];

const shippingAddressFromStorage: ShippingAddress = localStorage.getItem(
  "shippingAddress"
)
  ? JSON.parse(localStorage.getItem("shippingAddress") || "{}")
  : {};

const savePaymentMethodFromStorage: string = localStorage.getItem(
  "paymentMethod"
)
  ? JSON.parse(localStorage.getItem("paymentMethod") || "")
  : "";

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: savePaymentMethodFromStorage,
};

const cartReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product === payload.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item: CartItem) =>
            item.product === existItem.product ? payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };

    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case actionTypes.CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
