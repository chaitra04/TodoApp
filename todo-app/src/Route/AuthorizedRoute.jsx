import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthorizedRoute = ({ component, path }) => {
  let token = sessionStorage.getItem("jwtAuth");
  return token ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/"></Redirect>
  );
};

export default AuthorizedRoute;
