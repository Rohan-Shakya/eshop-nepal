import { actionTypes } from "../actionTypes";

const initialState: OrderDetailsState = {
  loading: false,
  orderDetails: null,
  error: "",
  paid: false,
};

const orderDetailsReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: payload,
      };
    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        paid: true,
      };
    case actionTypes.ORDER_PAY_RESET:
      return {
        ...state,
        paid: false,
        loading: false,
      };
    case actionTypes.ORDER_PAY_FAIL:
    case actionTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderDetailsReducer;
