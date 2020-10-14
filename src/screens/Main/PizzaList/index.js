import React from "react";
import { useSelector } from "react-redux";

import PizzaCard from "./PizzaCard";
import { Preloader } from "components";

import styles from "./styles.module.scss";

function PizzaList() {
  const pizzaIds = useSelector((state) => state.pizza.ids);
  const isLoading = useSelector((state) => state.pizza.loading);

  return (
    <div className={styles["list"]}>
      {isLoading ? (
        <Preloader />
      ) : (
        pizzaIds.map((id) => <PizzaCard key={id} id={id} />)
      )}
    </div>
  );
}

export default PizzaList;
