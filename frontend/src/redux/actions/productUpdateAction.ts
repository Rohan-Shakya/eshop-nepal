import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

type Product = {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  brand: string;
  category: string;
  countInStock: number | string;
  description: string;
};

export const updateProduct =
  (product: Product) =>
  async (dispatch: ProductDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `/api/products/update/${product._id}/`,
        product,
        config
      );

      dispatch({ type: actionTypes.PRODUCT_UPDATE_SUCCESS, payload: data });

      dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
