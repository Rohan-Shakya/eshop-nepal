import { actionTypes } from "../actionTypes";

const initialState = {
  userDetails: [],
  loading: false,
  error: "",
};

const userDetailsReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_DETAILS_REQUEST:
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_DETAILS_SUCCESS:
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: payload,
        loading: false,
        error: "",
      };
    case actionTypes.USER_DETAILS_FAIL:
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.USER_DETAILS_RESET:
    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return {
        userDetails: [],
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
