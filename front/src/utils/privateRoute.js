import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "../redux/store";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().generalReducer.loggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
