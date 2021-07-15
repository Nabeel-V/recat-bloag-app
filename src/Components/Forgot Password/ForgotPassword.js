import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Alert from "@material-ui/lab/Alert";

const ForgotPassword = () => {
  const { reset } = useAuth();
  const history = useHistory();
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "50px  auto",
    borderRadius: 15,
  };

  const resetPasswordButtonStyle = {
    background: "linear-gradient(90deg, #022326e6, #0896a4e0)",
    border: 0,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 20,
    color: "#fff",
    padding: "8px 30px",
  };

  const initialValues = {
    email: "",
  };

  async function handleResetPassword(values, props) {
    try {
      setMsg("");
      setError("");
      await reset(values.email);
      setMsg("checkYour email");
    } catch {
      setError("This email dosen't exist");
    }
  }

  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
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
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Password Reset</h2>
          </Grid>
          {msg && <Alert>{msg}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            onSubmit={handleResetPassword}
            validationSchema={formValidationSchema}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  variant="outlined"
                  label="email"
                  name="email"
                  placeholder="test@gmail.com"
                  fullWidth
                  style={{ margin: "45px 0px 12px 0px" }}
                  helperText={
                    <ErrorMessage name="email">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />

                <Grid align="center">
                  <Button
                    style={resetPasswordButtonStyle}
                    type="submit"
                    variant="contained"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading.." : "Reset Password"}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Typography
            align="center"
            variant="subtitle2"
            style={{ cursor: "pointer" }}
          >
            <Link onClick={() => history.push("/login")}>Login</Link>
          </Typography>
          <Typography
            align="center"
            variant="subtitle2"
            style={{ cursor: "pointer" }}
          >
            Don't Have an account..?&nbsp;
            <Link onClick={() => history.push("/signup")}>New User</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
