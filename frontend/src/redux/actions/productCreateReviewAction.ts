import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

type ReviewObject = {
  rating: string | number;
  comment: string;
};

export const createProductReview =
  (productId: string, review: ReviewObject) =>
  async (dispatch: createProductReviewDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
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

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );

      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
