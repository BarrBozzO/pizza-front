import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

function Success() {
  return (
    <div className={styles["success"]}>
      <h1>Congratulations! 🎉</h1>
      <div>You received order</div>
      <div>
        <Link className={styles["back-link"]} to="/">
          Go to Menu
        </Link>
      </div>
    </div>
  );
}

export default Success;
