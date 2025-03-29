import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { userRegisterState } from "../../redux/selectors/UserSelectors";
import { ERROR, LOADING } from "../../const/Common";
import DialogModal from "../../components/DialogModal";
import { useRegisterForm } from "./registerUtils";

const Register = () => {
  const [registerError, setRegisterError] = useState<boolean>(false);
  const registerState = useSelector(userRegisterState);

  useEffect(() => {
    if (registerState === ERROR) setRegisterError(true);
  }, [registerState]);

  const { formik } = useRegisterForm();

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
