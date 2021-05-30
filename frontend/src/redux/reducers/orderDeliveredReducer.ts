import { actionTypes } from "../actionTypes";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

const orderDeliveredReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.ORDER_DELIVER_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: "",
      };
    case actionTypes.ORDER_DELIVER_FAIL:
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

export default orderDeliveredReducer;
