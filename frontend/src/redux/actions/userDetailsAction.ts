import { actionTypes } from "../actionTypes";
import axios from "axios";
import { RootState } from "../combineReducer";

export const getUserDetails =
  (id: string) =>
  async (dispatch: UserDetailsDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.USER_DETAILS_REQUEST,
      });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}/`, config);

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

type User = {
  id: string | number;
  name: string;
  email: string;
  password?: string;
};

export const updateUserProfile =
  (user: User) =>
  async (dispatch: UserDetailsDispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
      });

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
        `/api/users/profile/update/`,
        user,
        config
      );

      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
