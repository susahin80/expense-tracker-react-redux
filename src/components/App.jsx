import React, { Component } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Expenses from "./Expenses";
import ExpenseForm from "./ExpenseForm";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./common/protectedRoute";
import { LoggedInRoute } from "./common/loggedInRoute";
import { checkAuthState } from "../store/actions/authActions";
import store from "../store/store";
import "semantic-ui-css/semantic.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(checkAuthState());
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <LoggedInRoute path="/login" exact component={Login} />
          <LoggedInRoute path="/register" exact component={Register} />
          <ProtectedRoute path="/expenses/new" exact component={ExpenseForm} />
          <ProtectedRoute
            path="/expenses/edit/:id"
            exact
            component={ExpenseForm}
          />
          <ProtectedRoute path="/expenses" exact component={Expenses} />
        </Switch>
      </div>
    );
  }
}

export default App;
