import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./pages/auth/SignIn.js";
import Home from "./pages/home/Home";

const RestrictedRoute = ({
  isTrueRequired,
  redirectTo,
  component: Component,
  ...rest
}) => (
  <Route {...rest}>
    {(props) => {
      return isTrueRequired ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo} />
      );
    }}
  </Route>
);

function PublicRoutes({
  isLoggedIn,
  changeLoginIsTrue,
  changeLoginIsFalse,
  removeCookie,
}) {
  return (
    <Switch>
      <RestrictedRoute
        path="/signin"
        isTrueRequired={!isLoggedIn}
        redirectTo="/home"
        component={() => (
          <SignIn
            changeLoginIsTrue={changeLoginIsTrue}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
      <Route
        exact
        path="/404"
        component={() => <h1>Error: 404 Not Found</h1>}
      />
      <RestrictedRoute
        path="/home"
        isTrueRequired={isLoggedIn}
        redirectTo="/signin"
        component={() => (
          <Home
            changeLoginIsFalse={changeLoginIsFalse}
            removeCookie={removeCookie}
          />
        )}
      />
      <Redirect to="/home" />
      <Route exact component={() => <h1>Opp error</h1>} />
    </Switch>
  );
}

export default PublicRoutes;
