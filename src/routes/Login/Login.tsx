import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  Link
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../../redux";
import { ERROR, IDLE, LOADING } from "../../const/Common";
import DialogModal from "../../components/DialogModal";
import { updateUserFetchState } from "../../redux/reducers/UserReducer";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";
import { loginAction } from "../../redux/actions/UserActions";
import { PASSWORD_RESET, REGISTER } from "..";
import {
  isUserDataLoading,
  userFetchState
} from "../../redux/selectors/UserSelectors";
import { currentAccessToken } from "../../redux/selectors/Tokenselectors";

import "./css/login.scss";

const Login = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector(userFetchState);
  const isUserLoading = useSelector(isUserDataLoading);
  const accessToken = useSelector(currentAccessToken);
  const location = useLocation();

  const formik = useFormik<UserDataTypes>({
    initialValues: {
      userName: "sergiu",
      password: "someRandomPassword"
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (userData: UserDataTypes) => dispatch(loginAction(userData))
  });

  const isError = loginState === ERROR;

  if (accessToken) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <Container
      component={"main"}
      className="login-wrapper"
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
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
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
                <CircularProgress className="spinner" size={20} />
              )}
            </Button>
          </Box>
        </form>
        <Box mt={2} alignContent="end">
          <Stack spacing={5} direction="row" justifyContent="flex-end">
            <Link href={REGISTER}>Register</Link>
            <Link href={PASSWORD_RESET}>Forgot password?</Link>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
