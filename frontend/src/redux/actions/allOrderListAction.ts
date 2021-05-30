import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const listOrders =
  () => async (dispatch: OrderListDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_LIST_REQUEST,
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

      const { data } = await axios.get(`/api/orders/`, config);

      dispatch({ type: actionTypes.ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
