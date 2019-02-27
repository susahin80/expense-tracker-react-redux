import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/auth-service";

export const ProtectedRoute = ({
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
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
