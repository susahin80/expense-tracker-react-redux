import axios from "axios";
import store from "../store/store";
import { logout } from "../store/actions/authActions";
import authService from "../services/auth-service";

export const expenseTrackerApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000
  // headers: {
  //   "x-auth-token": authService.getToken()
  // }
});

expenseTrackerApi.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      console.log("401 logout will be dispatched");
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

expenseTrackerApi.interceptors.request.use(
  function(config) {
    const token = authService.getToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// export const setAuthToken = token => {
//   if (token) {
//     // Apply to every request
//     expenseTrackerApi.defaults.headers["x-auth-token"] = token;
//   } else {
//     // Delete auth header
//     delete expenseTrackerApi.defaults.headers["x-auth-token"];
//   }
// };
