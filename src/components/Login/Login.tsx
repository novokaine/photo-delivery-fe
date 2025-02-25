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
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/LoginActions";
import { AppDispatch } from "../../redux";
import { loginStateSelector } from "../../redux/selectors/LoginSelectors";
import { FETCH_STATE } from "../../const/Common";
import DialogModal from "../DialogModal";
import { updateLoginState } from "../../redux/reducers/Authentication";

import "./css/login.scss";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector(loginStateSelector);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values) => dispatch(loginAction(values))
  });

  const isLoading = loginState === FETCH_STATE.LOADING;
  const isError = loginState === FETCH_STATE.ERROR;

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
        handleClose={() => dispatch(updateLoginState(FETCH_STATE.IDLE))}
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
              disabled={loginState === FETCH_STATE.LOADING}
              className="submit"
            >
              <span>Login</span>
              {isLoading && <CircularProgress color="secondary" size={20} />}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
