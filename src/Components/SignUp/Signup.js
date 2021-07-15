import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Checkbox,
  Link,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import Phone from "material-ui-phone-number";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../Context/AuthContext";

const Signup = () => {
  const history = useHistory();
  const { signup } = useAuth();
  const [error, setError] = useState();

  const paperStyle = {
    padding: "30px 30px",
    width: 300,
    margin: "50px auto",
    borderRadius: 15,
  };

  const avatarStyle = {
    background: "linear-gradient(90deg, #022326e6, #0896a4e0)",
  };

  const signupButtonStyle = {
    background: "linear-gradient(90deg, #022326e6, #0896a4e0)",
    border: 0,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 20,
    color: "#fff",
    padding: "8px 20px",
    display: "flex",
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "".toString(),
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  async function handleFormSubmit(values, props) {
    try {
      setError("");
      await signup(values.email, values.password);
      history.push("/login");
    } catch {
      setError("Something Wrong");
    }
  }
  const formValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 letters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "password dosen't match")
      .required("Reqired"),
    termsAndConditions: Yup.string()
      .oneOf(["true"], "Accept terms and conditions")
      .required(),
  });

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle} />
            <h2 style={{ margin: 0 }}>New User.?</h2>
            <Typography variant="caption">
              Please fill the section to create an account
            </Typography>
          </Grid>
          {error && <Alert>{error}</Alert>}
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={formValidationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  placeholder="enter Your name"
                  fullWidth
                  autoComplete="off"
                  helperText={
                    <ErrorMessage name="name">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  placeholder="teast@sample.com"
                  fullWidth
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={Phone}
                  name="phoneNumber"
                  defaultCountry={"in"}
                  style={{ marginTop: "10px" }}
                  fullWidth
                  autoComplete="off"
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="enter Your password"
                  fullWidth
                  autoComplete="off"
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={TextField}
                  label=" Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  fullWidth
                  autoComplete="off"
                  helperText={
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      color="primary"
                      name="termsAndConditions"
                    />
                  }
                  variant="caption"
                  label="I accept terms and conditons"
                  required
                />
                <FormHelperText>
                  <ErrorMessage name="termsAndConditions">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </FormHelperText>
                <Grid align="center">
                  <Button
                    elevation={5}
                    style={signupButtonStyle}
                    type="submit"
                    variant="contained"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading.." : "Create Account"}
                  </Button>
                </Grid>

                <Typography
                  align="center"
                  variant="subtitle2"
                  style={{ cursor: "pointer" }}
                >
                  Already Have an account..?&nbsp;
                  <Link
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
