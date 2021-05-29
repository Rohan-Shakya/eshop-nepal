import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const listUsers =
  () => async (dispatch: UserListDispatch, getState: () => RootState) => {
    try {
      dispatch({ type: actionTypes.USER_LIST_REQUEST });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/users/", config);

      dispatch({ type: actionTypes.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
