import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/auth-service";

export const LoggedInRoute = ({
  path,
  component: Component,
  auth,
  render,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (authService.isAuthenticated()) {
          return <Redirect to="/expenses" />;
        } else {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
  );
};
