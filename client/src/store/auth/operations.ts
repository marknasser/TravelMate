import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { authActions } from "./reducer";

interface LoginArgs {
  email: string;
  password: string;
}

interface SignupArgs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
}

export function signIn(credentials: LoginArgs) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        credentials,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login(res.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(dispatch, error as AxiosError);
      } else {
        // Handle other types of errors if necessary
        console.error("Unexpected error:", error);
      }
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}

export function signUp(credentials: SignupArgs) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/signup`,
        credentials,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login(res.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(dispatch, error as AxiosError);
      } else {
        // Handle other types of errors if necessary
        console.error("Unexpected error:", error);
      }
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}

export function checkIsLoggedIn() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authActions.process_pending(true));
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/isLoggedIn`,
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
          withCredentials: true,
        }
      );
      dispatch(authActions.login(res.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(dispatch, error as AxiosError);
      } else {
        // Handle other types of errors if necessary
        console.error("Unexpected error:", error);
      }
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}

export function logout() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authActions.process_pending(true));
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        withCredentials: true,
      });
      dispatch(authActions.logout());
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(dispatch, error as AxiosError);
      } else {
        // Handle other types of errors if necessary
        console.error("Unexpected error:", error);
      }
    } finally {
      dispatch(authActions.process_pending(false));
    }
  };
}

// Helper function to handle Axios errors
const handleAxiosError = (dispatch: Dispatch<any>, error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    dispatch(authActions.process_fail(error.response.data));
  } else if (error.request) {
    // The request was made but no response was received
    dispatch(authActions.process_fail("No response from server"));
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch(authActions.process_fail(error.message));
  }
};
