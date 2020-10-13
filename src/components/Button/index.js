import React from "react";
import cx from "classnames";

import styles from "./style.module.scss";

function Button({ onClick, children, secondary, className, ...otherProps }) {
  return (
    <button
      className={cx(styles["button"], className, {
        [styles["button--secondary"]]: secondary,
      })}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
