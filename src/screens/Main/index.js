import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PizzaList from "./PizzaList";
import { fetchPizza } from "store/slices/pizzaSlice";

import style from "./style.module.scss";

function Main() {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.global.currency);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [selectedCurrency]);

  return (
    <div className={style["main"]}>
      <h1>Pizza</h1>
      <PizzaList />
    </div>
  );
}

export default Main;
