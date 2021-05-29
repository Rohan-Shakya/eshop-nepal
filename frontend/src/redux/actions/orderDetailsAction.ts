import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const getOrderDetails =
  (id: string) =>
  async (dispatch: OrderDetailsDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_DETAILS_REQUEST,
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

      const { data } = await axios.get(`/api/orders/${id}/`, config);

      dispatch({ type: actionTypes.ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
