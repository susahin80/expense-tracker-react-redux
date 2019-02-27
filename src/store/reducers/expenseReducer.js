import {
  ADD_EXPENSE_STARTED,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  FETCH_EXPENSES_STARTED,
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_SUCCESS,
  // FETCH_EXPENSE_STARTED,
  // FETCH_EXPENSE_FAILURE,
  // FETCH_EXPENSE_SUCCESS,
  REMOVE_EXPENSE_STARTED,
  REMOVE_EXPENSE_SUCCESS,
  REMOVE_EXPENSE_FAILURE,
  UPDATE_EXPENSE_STARTED,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAILURE,
  FETCH_CATEGORIES_STARTED,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  expenses: [],
  categories: [],
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE_STARTED:
      return {
        ...state,
        loading: true
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: [...state.expenses, action.payload] // [...state.expenses, Object.assign({}, action.payload ) ]
      };
    case ADD_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_EXPENSES_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: action.payload.expenses
      };
    case FETCH_EXPENSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case FETCH_CATEGORIES_STARTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload.categories
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    // case FETCH_EXPENSE_STARTED:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case FETCH_EXPENSE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     expense: action.payload.expense
    //   };
    // case FETCH_EXPENSE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error
    //   };
    case REMOVE_EXPENSE_STARTED:
      return {
        ...state,
        loading: true
      };
    case REMOVE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: state.expenses.filter(item => item._id !== action.payload)
      };
    case REMOVE_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case UPDATE_EXPENSE_STARTED:
      return {
        ...state,
        loading: true
      };
    case UPDATE_EXPENSE_SUCCESS:
      const updatedItems = state.expenses.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });

      // todo: neil react'deki ile karşılaştır
      //  return [
      //	...state.filter(event => event.id !== payload.event.id),
      //		Object.assign({}, payload.event)
      //	  ]

      return {
        ...state,
        loading: false,
        error: null,
        expenses: updatedItems
      };
    case UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
