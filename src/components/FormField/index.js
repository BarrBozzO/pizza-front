import React from "react";
import { useField } from "formik";

import style from "./style.module.scss";

function FormField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={style["field"]}>
      <label className={style["field-label"]}>
        {label}
        <input className={style["field-input"]} {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className={style["field-error"]}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormField;
