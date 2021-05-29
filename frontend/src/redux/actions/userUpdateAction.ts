import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

type User = {
  _id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};
export const updateUser =
  (user: User) =>
  async (dispatch: UserListDispatch, getState: () => RootState) => {
    try {
      dispatch({ type: actionTypes.USER_UPDATE_REQUEST });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/update/${user._id}/`,
        user,
        config
      );

      dispatch({ type: actionTypes.USER_UPDATE_SUCCESS });

      dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
