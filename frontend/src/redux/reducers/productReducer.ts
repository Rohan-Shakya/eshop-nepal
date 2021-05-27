import { actionTypes } from "../actionTypes";

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: "",
};

const productReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case actionTypes.PRODUCT_LIST_FAIL:
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default productReducer;
