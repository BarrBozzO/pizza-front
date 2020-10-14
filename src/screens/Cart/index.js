import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Item from "./Item";
import OrderForm from "./OrderForm";
import { fetchPizza } from "store/slices/pizzaSlice";

import styles from "./style.module.scss";

const DELIVERY_PRICE = 100;

function rednerPrice(value, currency) {
  return `${value} ${currency}`;
}

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const pizzaItems = useSelector((state) => state.pizza.entities);
  const currencyISO = useSelector((state) => state.global.currency);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [currencyISO]);

  const prices = {
    items: Object.keys(cart.items).reduce((summ, id) => {
      const item = pizzaItems[id];
      const count = cart.items[id];

      if (count) {
        summ += count * parseFloat(item.price.value);
      }

      return summ;
    }, 0),
    delivery: DELIVERY_PRICE,
  };

  return (
    <div className={styles["cart"]}>
      <div className={styles["cart-list"]}>
        {Object.keys(cart.items)
          .filter((id) => !!cart.items[id])
          .map((id) => (
            <Item id={id} key={id} />
          ))}
      </div>
      <div className={styles["cart-summary"]}>
        <p>
          <b>Items</b>: {cart.count}
        </p>
        <p>
          <b>Price</b>: {rednerPrice(prices.items, currencyISO)}
        </p>
        <p>
          <b>Delivery Price</b>: {rednerPrice(prices.delivery, currencyISO)}
        </p>
        <p>
          <b>Total Price</b>:{" "}
          {rednerPrice(prices.delivery + prices.items, currencyISO)}
        </p>
        <div>
          <OrderForm />
        </div>
        <Link className={styles["cart-menu-link"]} to="/">
          Back to Menu
        </Link>
      </div>
    </div>
  );
}

export default Cart;
