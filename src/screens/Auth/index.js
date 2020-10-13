import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function index() {
  return (
    <Switch>
      <Route exact path="/auth/signin" component={SignIn} />
      <Route exact path="/auth/signup" component={SignUp} />
      <Redirect to="/auth/signin" />
    </Switch>
  );
}

export default index;
