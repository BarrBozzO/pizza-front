import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "store/slices/profileSlice";
import { Button, FormField } from "components";

import style from "./style.module.scss";

function SignUp() {
  const signedIn = useSelector((state) => Boolean(state.profile.data.id));
  const dispatch = useDispatch();

  if (signedIn) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(signUp(values)).then((response) => {
      if (response.error) {
        window.alert("Invalid Email / Password Pair");
        setSubmitting(false);
      }
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (!/^[a-zA-Z0-9]*$/.test(values.password)) {
      errors.password = "Password should contain only letters and numbers";
    } else if (
      values.password.trim().length > 30 ||
      values.password.trim().length < 8
    ) {
      errors.password = "Password should be from 8 to 30 symbols";
    }

    if (values.name) {
      if (values.name.trim().length > 128) {
        errors.name = "Name should be less than 128 symbols";
      }
    }

    if (!values.confirm_password.trim()) {
      errors.confirm_password = "Required";
    } else if (values.confirm_password !== values.password) {
      errors.confirm_password = "Passwords should match";
    }

    return errors;
  };

  return (
    <div className={style["auth"]}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
          name: "",
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={style["auth-form"]}>
            <FormField label={"Email"} type="text" name="email" />
            <FormField label={"Password"} type="password" name="password" />
            <FormField
              label={"Confirm Password"}
              type="password"
              name="confirm_password"
            />
            <FormField label={"Name"} type="text" name="name" />
            <Button
              className={style["auth-submit"]}
              type={"submit"}
              disabled={isSubmitting}
            >
              Sign-Up
            </Button>
            <Link className={style["auth-link"]} to="/auth/signin">
              Sign-In
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
