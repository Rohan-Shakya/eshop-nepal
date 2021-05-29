import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const deleteProduct =
  (id: string) =>
  async (dispatch: ProductDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_DELETE_REQUEST,
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

      await axios.delete(`/api/products/delete/${id}/`, config);

      dispatch({ type: actionTypes.PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
