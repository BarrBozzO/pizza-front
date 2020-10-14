import React from "react";

import styles from "./style.module.scss";

function Success() {
  return (
    <div className={styles["success"]}>
      <h1>Congratulations! 🎉</h1>
      <div>You received order</div>
    </div>
  );
}

export default Success;
