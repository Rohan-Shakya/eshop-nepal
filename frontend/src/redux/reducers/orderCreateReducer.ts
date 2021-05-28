import { actionTypes } from "../actionTypes";

const initialState = {
  loading: false,
  success: false,
  order: null,
  error: "",
};

const orderCreateReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: payload,
      };
    case actionTypes.ORDER_CREATE_RESET:
      return {
        ...state,
        loading: false,
        order: null,
        success: false,
      };
    case actionTypes.ORDER_CREATE_FAIL:
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

export default orderCreateReducer;
