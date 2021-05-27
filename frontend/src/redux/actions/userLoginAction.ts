import { actionTypes } from "../actionTypes";
import axios from "axios";

export const login =
  (email: string, password: string) => async (dispatch: UserLoginDispatch) => {
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
