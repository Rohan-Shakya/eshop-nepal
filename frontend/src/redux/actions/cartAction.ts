import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: ProductDispatch, getState: () => RootState) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({
        type: actionTypes.CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartState.cartItems)
      );
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const removeFromCart =
  (id: string) => (dispatch: ProductDispatch, getState: () => RootState) => {
    dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartState.cartItems)
    );
  };

export const saveShippingAddress =
  (data: ShippingAddress) => (dispatch: CartDispatch) => {
    dispatch({
      type: actionTypes.CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

export const savePaymentMethod = (data: string) => (dispatch: CartDispatch) => {
  dispatch({
    type: actionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
