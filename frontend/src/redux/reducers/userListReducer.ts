import { actionTypes } from "../actionTypes";

const initialState: UserListState = {
  users: [],
  loading: false,
  error: "",
};

const userListReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LIST_REQUEST:
    case actionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_LIST_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: "",
      };
    case actionTypes.USER_LIST_RESET:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case actionTypes.USER_DELETE_SUCCESS:
      const filteredUsers = state.users.filter((user) => user._id !== payload);
      return {
        ...state,
        loading: false,
        users: filteredUsers,
      };
    case actionTypes.USER_DETAILS_FAIL:
    case actionTypes.USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userListReducer;
