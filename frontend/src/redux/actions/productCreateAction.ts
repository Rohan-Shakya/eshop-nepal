import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const createProduct =
  () => async (dispatch: ProductDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REQUEST,
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

      const { data } = await axios.post(`/api/products/create/`, {}, config);

      dispatch({ type: actionTypes.PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
