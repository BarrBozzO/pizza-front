import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "components";
import { addItem, removeItem } from "store/slices/cartSlice";

import style from "./styles.module.scss";

function PizzaCard({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pizza.entities[id]);
  const inCartCount = useSelector((state) => state.cart.items[id] || 0);

  const renderPrice = () => {
    const { value, currency } = data.price;
    return (
      <div className={style["card-price"]}>
        <span>{value}</span> <span>{currency.iso}</span>
      </div>
    );
  };

  const handleAdd = (id) => {
    dispatch(addItem({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem({ id }));
  };

  return (
    <div className={style["card"]}>
      <div className={style["card-picture"]}>
        <img src={data.picture} />
      </div>
      <div className={style["card-title"]}>{data.name}</div>
      <div className={style["card-description"]}>{data.description}</div>
      <div className={style["card-footer"]}>
        {renderPrice()}
        {inCartCount === 0 ? (
          <Button className={style["card-add"]} onClick={() => handleAdd(id)}>
            Add to cart
          </Button>
        ) : (
          <>
            <Button
              className={style["card-decrement"]}
              onClick={() => handleRemove(id)}
            >
              -
            </Button>
            <b>{inCartCount}</b>
            <Button
              className={style["card-increment"]}
              onClick={() => handleAdd(id)}
            >
              +
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default PizzaCard;
