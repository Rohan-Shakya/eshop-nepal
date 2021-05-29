import { actionTypes } from "../actionTypes";

const initialState: OrderDetailsState = {
  loading: false,
  success: false,
  orderDetails: null,
  error: "",
};

const orderDetailsReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orderDetails: payload,
      };
    case actionTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default orderDetailsReducer;
