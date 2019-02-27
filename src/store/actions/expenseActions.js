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
  FETCH_EXPENSES_SUCCESS,
  // FETCH_EXPENSE_STARTED,
  // FETCH_EXPENSE_FAILURE,
  // FETCH_EXPENSE_SUCCESS,
  FETCH_CATEGORIES_STARTED,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS
} from "./actionTypes";
import { expenseTrackerApi } from "../../api/expense-tracker-api";
import history from "../../history";

export const addExpense = expense => {
  return dispatch => {
    dispatch(addExpenseStarted());

    expenseTrackerApi
      .post("/expenses", expense)
      .then(res => {
        dispatch(addExpenseSuccess(res.data));
        history.push("/expenses");
      })
      .catch(err => {
        dispatch(addExpenseFailure(err));
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

    expenseTrackerApi
      .get(`/expenses`)
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

//
export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesStarted());

    expenseTrackerApi
      .get("/expenses/categories")
      .then(res => {
        console.log(res.data);
        dispatch(fetchCategoriesSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchCategoriesFailure(err.message));
      });
  };
};

export const fetchCategoriesStarted = () => {
  return {
    type: FETCH_CATEGORIES_STARTED,
    payload: {
      isLoading: true
    }
  };
};

export const fetchCategoriesSuccess = categories => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
      categories
    }
  };
};

export const fetchCategoriesFailure = error => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
      error
    }
  };
};

// export const fetchExpense = id => {
//   return dispatch => {
//     dispatch(fetchExpenseStarted());

//     expenseTrackerApi
//       .get(`/expenses/${id}`)
//       .then(res => {
//         dispatch(fetchExpenseSuccess(res.data));
//       })
//       .catch(err => {
//         dispatch(fetchExpenseFailure(err.message));
//       });
//   };
// };

// export const fetchExpenseStarted = () => {
//   return {
//     type: FETCH_EXPENSE_STARTED,
//     payload: {
//       isLoading: true
//     }
//   };
// };

// export const fetchExpenseSuccess = expense => {
//   return {
//     type: FETCH_EXPENSE_SUCCESS,
//     payload: {
//       expense
//     }
//   };
// };

// export const fetchExpenseFailure = error => {
//   return {
//     type: FETCH_EXPENSE_FAILURE,
//     payload: {
//       error
//     }
//   };
// };

//

export const removeExpense = id => {
  return dispatch => {
    dispatch(removeExpenseStarted());
    expenseTrackerApi
      .delete("/expenses/" + id)
      .then(res => {
        dispatch(removeExpenseSuccess(id));
        history.push("/expenses");
      })
      .catch(err => {
        dispatch(removeExpenseFailure(err.message));
      });
  };
};

export const removeExpenseStarted = () => {
  return {
    type: REMOVE_EXPENSE_STARTED
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

    expenseTrackerApi
      .put("/expenses/" + expense._id, { ...expense, _id: undefined })
      .then(res => {
        dispatch(updateExpenseSuccess(expense));
        history.push("/expenses");
      })
      .catch(err => {
        dispatch(updateExpenseFailure(err.message));
      });
  };
};

export const updateExpenseStarted = () => {
  return {
    type: UPDATE_EXPENSE_STARTED
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
