import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../../redux";
import { ERROR, IDLE, LOADING } from "../../const/Common";
import DialogModal from "../../components/DialogModal";
import { updateUserFetchState } from "../../redux/reducers/UserReducer";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";
import { loginAction } from "../../redux/actions/UserActions";
import { FORGOT_PASSWORD, REGISTER } from "..";
import { userFetchState } from "../../redux/selectors/UserSelectors";

const Login = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(userFetchState);
  const isUserLoading = userState === LOADING;

  const isError = userState === ERROR;

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
              disabled={userState === LOADING}
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
            <Link to={REGISTER}>Register</Link>
            <Link to={FORGOT_PASSWORD}>Forgot password?</Link>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
