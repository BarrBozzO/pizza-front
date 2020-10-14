import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "components";

import { addItem, removeItem } from "store/slices/cartSlice";

import styles from "./style.module.scss";

function Item({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pizza.entities[id]);
  const count = useSelector((state) => state.cart.items[id]);

  if (!data) return null;

  const handleAdd = (id) => {
    dispatch(addItem({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  const renderPrice = () => {
    const { value, currency } = data.price;
    return (
      <>
        <div className={styles["cart-item-price"]}>
          <span>{parseFloat(value) * count}</span> <span>{currency.iso}</span>
        </div>
        <div>
          <span className={styles["cart-item-price-per-item"]}>
            <span>{value}</span> <span>{currency.iso}</span> per item
          </span>
        </div>
      </>
    );
  };

  return (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item-picture"]}>
        <img src={data.picture} />
      </div>
      <div className={styles["cart-item-title"]}>{data.name}</div>
      <div className={styles["cart-item-description"]}>{data.description}</div>
      {renderPrice()}
      <div className={styles["cart-item-footer"]}>
        <Button
          className={styles["cart-item-decrement"]}
          onClick={() => handleRemove(id)}
        >
          -
        </Button>
        <b>{count}</b>
        <Button
          className={styles["cart-item-increment"]}
          onClick={() => handleAdd(id)}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default Item;
