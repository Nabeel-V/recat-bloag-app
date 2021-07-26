import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../Context/AuthContext";
import './EditProfile.css'





const EditProfile = () => {
  const history = useHistory();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState();

  const paperStyle = {
    padding: "30px 30px",
    width: 300,
    margin: "50px auto",
    borderRadius: 15,
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
    name: currentUser && currentUser.email,
    email: currentUser && currentUser.email,
    password: "",
    confirmPassword: "",
  };

  async function handleFormSubmit(values, props) {
    setError("");

    const promises = [];
    if (values.email !== currentUser.email) {
      promises.push(updateEmail(values.email));
    }
    if (values.password) {
      promises.push(updatePassword(values.password));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to Update");
      })
      .finally(() => {});
  }
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    email: Yup.string().email("Invalid email"),
    password: Yup.string().min(6, "Minimum 6 letters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "password dosen't match"
    ),
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
            <h2 style={{ margin: 0 }}>Update Profile</h2>
            <br />
            <div class="profile-pic">
              <label class="-label" for="file">
                <span class="glyphicon glyphicon-camera"></span>
                <span>Change Image</span>
              </label>
              <input id="file" type="file"/>
              <img
                src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
                id="output"
                width="200"
                alt=""
              />
            </div>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
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
                  placeholder="Leave blank to keep same"
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
                  fullWidth
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Leave blank to keep same"
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
                  placeholder="Leave blank to keep same"
                  fullWidth
                  autoComplete="off"
                  helperText={
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />

                <Grid align="center">
                  <Button
                    elevation={5}
                    style={signupButtonStyle}
                    type="submit"
                    variant="contained"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading.." : "Update Details"}
                  </Button>
                </Grid>

                <Typography
                  align="center"
                  variant="subtitle2"
                  style={{ cursor: "pointer" }}
                >
                  Not now&nbsp;
                  <Link
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Back to home
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

export default EditProfile;
