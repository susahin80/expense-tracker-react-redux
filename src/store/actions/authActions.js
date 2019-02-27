import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "./actionTypes";

import authApi from "../../api/auth-api";
import history from "../../history";
import jwt_decode from "jwt-decode";
import authService from "../../services/auth-service";

export const auth = (email, password) => dispatch => {
  dispatch(authStart());

  authApi
    .post("/users/login", { email, password })
    .then(response => {
      const token = response.headers["x-auth-token"];
      localStorage.setItem("token", token);

      const decoded = jwt_decode(token);
      dispatch(authSuccess(decoded));
      history.push("/");
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch(authFail(error.response.data));
      } else if (error.message) {
        dispatch(authFail(error.message));
      } else {
        dispatch(authFail("Something went bad"));
      }
    });
};

export const register = account => {
  return dispatch => {
    dispatch(registerStart());

    authApi
      .post("/users/register", account)
      .then(response => {
        dispatch(registerSuccess());
        history.push("/login");
      })
      .catch(error => {
        if (error.response && error.response.data) {
          dispatch(registerFail(error.response.data));
        } else if (error.message) {
          dispatch(registerFail(error.message));
        } else {
          dispatch(registerFail("Something went bad"));
        }
      });
  };
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: AUTH_SUCCESS,
    payload: user
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAILURE,
    payload: {
      error
    }
  };
};

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      const decoded = authService.getDecoded();
      dispatch(authSuccess(decoded));
    }
  };
};

export const registerStart = () => {
  return {
    type: REGISTER_START
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

export const registerFail = error => {
  return {
    type: REGISTER_FAILURE,
    payload: {
      error
    }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  history.push("/login");
  return {
    type: AUTH_LOGOUT
  };
};
