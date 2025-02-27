import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";
import { AppDispatch } from "../../redux";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { registerAction } from "../../redux/actions/UserActions";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
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
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="userName"
            label="Please enter yout username"
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
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
