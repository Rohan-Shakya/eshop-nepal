import { actionTypes } from "../actionTypes";

const initialState = {
  success: false,
  loading: false,
  product: {},
  error: "",
};

const productCreateReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
      };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.PRODUCT_CREATE_RESET:
      return {
        ...state,
        loading: false,
        error: "",
        success: false,
      };

    default:
      return state;
  }
};

export default productCreateReducer;
