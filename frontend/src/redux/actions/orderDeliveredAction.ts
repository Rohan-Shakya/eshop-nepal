import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const deliverOrder =
  (order: OrderDetail) =>
  async (dispatch: OrderDetailsDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_DELIVER_REQUEST,
      });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver/`,
        {},
        config
      );

      dispatch({
        type: actionTypes.ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
