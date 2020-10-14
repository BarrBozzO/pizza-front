import React from "react";

import { ReactComponent as Icon } from "assets/icons/circle-loader.svg";

import styles from "./style.module.scss";

function Preloader() {
  return (
    <div className={styles["preloader"]}>
      <Icon className={styles["preloader-icon"]} />
    </div>
  );
}

export default Preloader;
