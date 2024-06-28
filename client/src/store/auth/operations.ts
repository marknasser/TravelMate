import { authActions } from "./reducer";
import axios from "axios";

interface LoginArgs {
  email: string;
  password: string;
}

export function signIn(credentials: LoginArgs) {
  return async (dispatch) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        credentials,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login(res.data));
    } catch (error) {
      dispatch(authActions.process_fail(error.response.data));
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}
export function checkIsLoggedIn() {
  return async (dispatch) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/v1/users/isLoggedIn",
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login(res.data));
    } catch (error) {
      dispatch(authActions.process_fail(error.response.data));
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/users/logout", {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        withCredentials: true,
      });
      dispatch(authActions.logout());
    } catch (error) {
      dispatch(authActions.process_fail(error.response.data));
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}
