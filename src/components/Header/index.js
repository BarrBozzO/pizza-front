import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "store/slices/global";

import { Button } from "components";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./style.module.scss";

function Header({ isLogged, cartItemsCount }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const selectedCurrencyISO = useSelector((state) => state.global.currency);
  const currencies = useSelector((state) => state.currencies);

  const handleCurrencyChange = (event) => {
    const nextCurrencyId = event.target.value;
    dispatch(changeCurrency(nextCurrencyId));
  };

  return (
    <div className={styles["header"]}>
      {location.pathname !== "/" && (
        <Button
          secondary
          className={styles["header-menu"]}
          onClick={() => history.push("/")}
        >
          MENU
        </Button>
      )}
      <div className={styles["header-controls"]}>
        <select
          className={styles["header-currency"]}
          defaultValue={selectedCurrencyISO}
          onChange={handleCurrencyChange}
        >
          {currencies.ids.map((id) => {
            const data = currencies.entities[id];
            return (
              <option key={id} value={data.iso}>
                {data.iso}
              </option>
            );
          })}
        </select>
        {location.pathname !== "/cart" && (
          <Button
            onClick={() => history.push("/cart")}
            secondary
            className={styles["cart"]}
          >
            {Boolean(cartItemsCount) && (
              <span className={styles["cart-counter"]}>{cartItemsCount}</span>
            )}
            Cart
          </Button>
        )}
        {isLogged ? (
          <Button
            onClick={() => history.push("/profile")}
            className={styles["header-profile"]}
          >
            Profile
          </Button>
        ) : (
          <Button
            onClick={() => history.push("/auth")}
            className={styles["header-signin"]}
          >
            Sign-In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
