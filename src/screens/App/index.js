import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Main from "../Main";
import Profile from "../Profile";
import Cart from "../Cart";
import OrderSuccess from "../OrderSuccess";
import Auth from "../Auth";
import { fetchCurrencies } from "store/slices/currenciesSlice.js";
import { fetchProfile } from "store/slices/profileSlice.js";

import { Header } from "components";

import styles from "./style.module.scss";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => Boolean(state.profile.data.id));
  const cartCount = useSelector((state) => state.cart.count);

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className={styles["app"]}>
      <Router>
        <Header isLogged={isLogged} cartItemsCount={cartCount} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/success-order">
            <OrderSuccess />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
