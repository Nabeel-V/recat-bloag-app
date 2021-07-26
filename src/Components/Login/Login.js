import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import Alert from '@material-ui/lab/Alert'


const Login = () => {
  const { login } = useAuth();
  const history = useHistory();
    const [error, setError] = useState();

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "50px  auto",
    borderRadius:15,
  };

  const avatarStyle = {
    background: "linear-gradient(90deg, #022326e6, #0896a4e0)",
  };

  const signinButtonStyle = {
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
    password: "",
  };

  async function onSubmit(values, props) {
    try {
      setError("")
      await login(values.email, values.password)
      history.push('/edit')
    } catch {
      setError("Something Wrong")
    }
  }

    const formValidationSchema = Yup.object().shape({
 
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
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
            <Avatar style={avatarStyle} />
            <h2>Sign IN</h2>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
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
                <Field
                  as={TextField}
                  style={{ margin: "0px 0px 12px 0px" }}
                  variant="outlined"
                  label="password"
                  type="password"
                  name="password"
                  placeholder="Enter Your password"
                  fullWidth
                  autoComplete="off"
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  }
                />
                <FormControlLabel
                  control={<Field as={Checkbox} color="primary" />}
                  label="Remember Login"
                />
                <Grid align="center">
                  <Button
                    style={signinButtonStyle}
                    type="submit"
                    variant="contained"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading.." : "Log In"}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Typography
            align="center"
            variant="subtitle2"
            style={{ margin: "5px auto", cursor: "pointer"}}
          >
            <Link onClick={() => history.push("/resetpassword")}>
              Forgot Password
            </Link>
          </Typography>
          <Typography align="center" variant="subtitle2"style={{ cursor: "pointer"}} >
            Don't Have an account..?&nbsp;
            <Link onClick={() => history.push("/signup")}>New User</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
