import { actionTypes } from "../actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: "",
  success: false,
};

const userUpdateReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        success: true,
        error: "",
      };
    case actionTypes.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.USER_UPDATE_RESET:
      return {
        ...state,
        user: {},
        loading: false,
        error: "",
        success: false,
      };
    default:
      return state;
  }
};

export default userUpdateReducer;
