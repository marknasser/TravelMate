import { authActions } from "./reducer";
import axios from "axios";

interface LoginArgs {
  email: string;
  password: string;
}

export function signIn(credentials: LoginArgs) {
  return async (dispatch) => {
    dispatch(authActions.login_pending(true));
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        credentials,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login_success(res.data));
    } catch (error) {
      console.log("signIn fail", error.response.data);
      dispatch(authActions.login_fail(error.response.data));
    } finally {
      dispatch(authActions.login_pending(false));
    }
  };
}
export function checkIsLoggedIn() {
  return async (dispatch) => {
    dispatch(authActions.login_pending(true));
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/v1/users/isLoggedIn",
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login_success(res.data));
    } catch (error) {
      dispatch(authActions.login_fail(error.response.data));
    } finally {
      dispatch(authActions.login_pending(false));
    }
  };
}
