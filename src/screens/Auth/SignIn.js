import React from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signIn } from "store/slices/profileSlice";
import { Button, FormField } from "components";

import style from "./style.module.scss";

function SignIn() {
  const signedIn = useSelector((state) => Boolean(state.profile.data.id));
  const dispatch = useDispatch();

  if (signedIn) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(signIn(values)).then((response) => {
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
    }

    return errors;
  };

  return (
    <div className={style["auth"]}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={style["auth-form"]}>
            <FormField label={"Email"} type="text" name="email" />
            <FormField label={"Password"} type="password" name="password" />
            <Button
              className={style["auth-submit"]}
              type={"submit"}
              disabled={isSubmitting}
            >
              Sign-In
            </Button>
            <Link to="/auth/signup">Sign-Up</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
