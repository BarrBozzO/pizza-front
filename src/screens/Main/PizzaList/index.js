import React from "react";
import { useSelector } from "react-redux";

import PizzaCard from "./PizzaCard";

import styles from "./styles.module.scss";

function PizzaList() {
  const pizzaIds = useSelector((state) => state.pizza.ids);
  const isLoading = useSelector((state) => state.pizza.loading);

  return (
    <div className={styles["list"]}>
      {isLoading
        ? "Loading data..."
        : pizzaIds.map((id) => <PizzaCard key={id} id={id} />)}
    </div>
  );
}

export default PizzaList;
