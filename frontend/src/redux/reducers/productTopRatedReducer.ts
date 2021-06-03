import { actionTypes } from "../actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

const productTopRatedReducers = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_TOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case actionTypes.PRODUCT_TOP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default productTopRatedReducers;
