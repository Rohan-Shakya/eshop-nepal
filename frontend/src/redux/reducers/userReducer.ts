import { actionTypes } from "../actionTypes";

const userInfoFromStorage: UserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "null")
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: "",
};

const UserReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
        error: "",
      };
    case actionTypes.USER_LOGIN_FAIL:
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.USER_LOGOUT:
      return {
        userInfo: null,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};

export default UserReducer;
