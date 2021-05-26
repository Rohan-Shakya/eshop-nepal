import { actionTypes } from "../actionTypes";
import axios from "axios";

export const listProducts = () => async (dispatch: ProductDispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products/");

    dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
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

export const listProductDetail =
  (id: string) => async (dispatch: ProductDispatch) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
