import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions/actionTypes";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        user: action.payload,
        isAuthenticated: true
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        errors: {
          login: action.payload.error
        }
      };
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: {
          register: action.payload.error
        }
      };
    case AUTH_LOGOUT: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}
