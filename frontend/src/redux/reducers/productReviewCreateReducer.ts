import { actionTypes } from "../actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

const productReviewCreateReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {
        ...state,
        success: false,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};

export default productReviewCreateReducer;
