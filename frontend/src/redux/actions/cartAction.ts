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
