import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../../redux";
import { FETCH_STATE } from "../../const/Common";
import DialogModal from "../../components/DialogModal";
import { updateUserFetchState } from "../../redux/reducers/UserReducer";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";

import { loginAction } from "../../redux/actions/UserActions";
import {
  isUserDataLoading,
  userLoginState
} from "../../redux/selectors/UserSelectors";

import "./css/login.scss";
import React, { useEffect } from "react";
import { currentAccessToken } from "../../redux/selectors/Tokenselectors";

const Login = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector(userLoginState);
  const isUserLoading = useSelector(isUserDataLoading);
  const accessToken = useSelector(currentAccessToken);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "sergiu",
      password: "parola"
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (userData: UserDataTypes) => dispatch(loginAction(userData))
  });

  const { LOADING, ERROR, IDLE } = FETCH_STATE;
  const isError = loginState === ERROR;

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  return (
    <Container
      component={"main"}
      maxWidth={"xs"}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center"
      }}
    >
      <DialogModal
        isOpen={isError}
        dialogTitle="Error"
        dialogText="Authentication error occured"
        handleClose={() => dispatch(updateUserFetchState(IDLE))}
      />
      <Paper
        elevation={3}
        sx={{ padding: 3, width: "100%" }}
        className="paper-form"
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="userName"
            label="Please enter your username*"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            margin="normal"
            autoComplete="off"
          />
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Please enter your password*"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            autoComplete="off"
          />
          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              type="submit"
              disabled={loginState === LOADING}
              className="submit"
            >
              <span>Login</span>
              {isUserLoading && (
                <CircularProgress color="secondary" size={20} />
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
