import {
  ADD_EXPENSE_STARTED,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  REMOVE_EXPENSE_STARTED,
  REMOVE_EXPENSE_SUCCESS,
  REMOVE_EXPENSE_FAILURE,
  UPDATE_EXPENSE_STARTED,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAILURE,
  FETCH_EXPENSES_STARTED,
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_SUCCESS
} from "./actionTypes";
import axios from "axios";

// const uid = () =>
//   Math.random()
//     .toString(34)
//     .slice(2);

export const addExpense = expense => {
  return dispatch => {
    dispatch(addExpenseStarted());

    axios
      .post("http://localhost:3001/expenses", expense)
      .then(res => {
        dispatch(addExpenseSuccess(res.data));
      })
      .catch(err => {
        dispatch(addExpenseFailure(err.message));
      });
  };
};

export const addExpenseStarted = () => {
  return {
    type: ADD_EXPENSE_STARTED,
    payload: {
      isLoading: true
    }
  };
};

export const addExpenseSuccess = expense => {
  return {
    type: ADD_EXPENSE_SUCCESS,
    payload: {
      ...expense
    }
  };
};

export const addExpenseFailure = error => {
  return {
    type: ADD_EXPENSE_FAILURE,
    payload: {
      error
    }
  };
};

export const fetchExpenses = () => {
  return dispatch => {
    dispatch(fetchExpensesStarted());

    axios
      .get("http://localhost:3001/expenses")
      .then(res => {
        dispatch(fetchExpensesSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchExpensesFailure(err.message));
      });
  };
};

export const fetchExpensesStarted = () => {
  return {
    type: FETCH_EXPENSES_STARTED,
    payload: {
      isLoading: true
    }
  };
};

export const fetchExpensesSuccess = expenses => {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    payload: {
      expenses
    }
  };
};

export const fetchExpensesFailure = error => {
  return {
    type: FETCH_EXPENSES_FAILURE,
    payload: {
      error
    }
  };
};

export const removeExpense = id => {
  return dispatch => {
    dispatch(removeExpenseStarted());

    axios
      .delete("http://localhost:3001/expenses/" + id)
      .then(res => {
        dispatch(removeExpenseSuccess(id));
      })
      .catch(err => {
        dispatch(removeExpenseFailure(err.message));
      });
  };
};

export const removeExpenseStarted = () => {
  return {
    type: REMOVE_EXPENSE_STARTED,
    payload: {
      isLoading: true
    }
  };
};

export const removeExpenseSuccess = id => {
  return {
    type: REMOVE_EXPENSE_SUCCESS,
    payload: id
  };
};

export const removeExpenseFailure = error => {
  return {
    type: REMOVE_EXPENSE_FAILURE,
    payload: {
      error
    }
  };
};

export const updateExpense = expense => {
  return dispatch => {
    dispatch(updateExpenseStarted());

    axios
      .put("http://localhost:3001/expenses/" + expense.id, expense)
      .then(res => {
        dispatch(updateExpenseSuccess(expense));
      })
      .catch(err => {
        dispatch(updateExpenseFailure(err.message));
      });
  };
};

export const updateExpenseStarted = () => {
  return {
    type: UPDATE_EXPENSE_STARTED,
    payload: {
      isLoading: true
    }
  };
};

export const updateExpenseSuccess = expense => {
  return {
    type: UPDATE_EXPENSE_SUCCESS,
    payload: expense
  };
};

export const updateExpenseFailure = error => {
  return {
    type: UPDATE_EXPENSE_FAILURE,
    payload: {
      error
    }
  };
};
