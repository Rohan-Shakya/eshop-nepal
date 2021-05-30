import { actionTypes } from "../actionTypes";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const orderListReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case actionTypes.ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderListReducer;
