import React from "react";
import { Formik, Form, useField } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeOrder } from "store/slices/ordersSlice";
import { Button } from "components";

import style from "./style.module.scss";

const CustomField = ({ label, ...props }) => {
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
};

function OrderForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(makeOrder(values)).then((data) => {
      setSubmitting(false);
      if (data.error) {
        return window.alert(data.error.message);
      }
      history.push("/success-order");
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.street.trim()) {
      errors.street = "Required";
    } else if (!/^([A-Z0-9\.\,\-\s])*$/i.test(values.street)) {
      errors.street = "Invalid street address";
    }

    if (!values.flat.trim()) {
      errors.flat = "Required";
    } else if (!/[A-Z0-9-]/i.test(values.flat)) {
      errors.flat = "Invalid flat";
    }

    if (!values.floor > 0) {
      errors.floor = "Invalid floor ";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{ street: "", floor: 1, flat: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomField label={"Street"} type="text" name="street" />

            <CustomField label={"Flat / Office"} type="text" name="flat" />

            <CustomField
              label={"Floor"}
              type="number"
              name="floor"
              min={1}
              max={999}
            />

            <Button
              className={style["cart-order"]}
              secondary
              type={"submit"}
              disabled={isSubmitting}
            >
              Order
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OrderForm;
