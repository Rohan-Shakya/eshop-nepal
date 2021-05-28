import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const createOrder =
  (order: Order) =>
  async (dispatch: OrderCreateDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_CREATE_REQUEST,
      });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders/add/`, order, config);

      dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data });

      dispatch({ type: actionTypes.CART_CLEAR_ITEMS, payload: data });

      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
