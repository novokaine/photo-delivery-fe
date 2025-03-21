import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";
import { AppDispatch } from "../../redux";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { registerAction } from "../../redux/actions/UserActions";
import { userRegisterState } from "../../redux/selectors/UserSelectors";
import { ERROR, LOADING } from "../../const/Common";
import DialogModal from "../../components/DialogModal";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [registerError, setRegisterError] = useState<boolean>(false);
  const registerState = useSelector(userRegisterState);

  useEffect(() => {
    if (registerState === ERROR) setRegisterError(true);
  }, [registerState]);

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      retypePassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      userName: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      retypePassword: Yup.string().oneOf(
        // @ts-ignore
        [Yup.ref("password"), null],
        'Must match "password" field value'
      )
    }),
    onSubmit: (userData: UserDataTypes) => dispatch(registerAction(userData))
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContentL: "center"
      }}
    >
      <DialogModal
        isOpen={registerError}
        dialogTitle="User registration failed"
        dialogText="An error occured. Please try again later"
        handleClose={() => setRegisterError(false)}
      />
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            label="Please enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            autoComplete="off"
          />
          <TextField
            fullWidth
            id="userName"
            label="Please enter your username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            margin="normal"
            autoComplete="off"
          />
          <TextField
            fullWidth
            id="password"
            label="Please choose a password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            autoComplete="off"
            type="password"
          />

          <TextField
            fullWidth
            id="retypePassword"
            label="Please reenter the password"
            value={formik.values.retypePassword}
            onChange={formik.handleChange}
            error={
              formik.touched.retypePassword &&
              Boolean(formik.errors.retypePassword)
            }
            helperText={
              formik.touched.retypePassword && formik.errors.retypePassword
            }
            margin="normal"
            autoComplete="off"
            type="password"
          />
          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              type="submit"
              className="submit"
            >
              <span>Register</span>
              {registerState === LOADING && (
                <CircularProgress color="secondary" size={20} />
              )}
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Link href="/" underline="hover">
            Back
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
