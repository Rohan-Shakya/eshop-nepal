import { actionTypes } from "../actionTypes";
import axios from "axios";

export const login =
  (email: string, password: string) => async (dispatch: UserDispatch) => {
    try {
      dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login/",
        {
          username: email,
          password,
        },
        config
      );

      dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: UserDispatch) => {
    try {
      dispatch({
        type: actionTypes.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register/",
        {
          name,
          email,
          password,
        },
        config
      );

      dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch: UserDispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actionTypes.USER_LOGOUT });
};
