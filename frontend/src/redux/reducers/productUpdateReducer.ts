import { actionTypes } from "../actionTypes";

const initialState = {
  success: false,
  loading: false,
  product: {},
  error: "",
};

const productUpdateReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload,
        success: true,
      };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.PRODUCT_UPDATE_RESET:
      return {
        ...state,
        success: false,
        loading: false,
        product: {},
        error: "",
      };

    default:
      return state;
  }
};

export default productUpdateReducer;
