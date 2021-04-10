import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Home } from "../Containers";
import AuthorizedRoute from "./AuthorizedRoute";
const RouteConfig = () => (
    <Switch>
        <Route exact path="/" component={Login} name="Login"/>
        <AuthorizedRoute path="/home" component={Home} name="Home"/>
    </Switch>
)

export default RouteConfig;