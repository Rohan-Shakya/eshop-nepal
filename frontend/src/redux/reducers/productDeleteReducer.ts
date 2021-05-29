import { actionTypes } from "../actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

const productDeleteReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default productDeleteReducer;
