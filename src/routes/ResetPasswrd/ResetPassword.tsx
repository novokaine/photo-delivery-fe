import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { resetPasswordAction } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux";
import { userFetchState } from "../../redux/selectors/UserSelectors";
import { LOADING, SUCCESS } from "../../const/Common";

const ResetPassword = () => {
  const userFetchStatus = useSelector(userFetchState);

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required")
    }),
    onSubmit: (userData: { email: string }, { setSubmitting }) => {
      dispatch(resetPasswordAction({ email: userData.email }));
      setSubmitting(false);
    }
  });

  const resetForm = (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        label="Please enter your email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Box mt={2}>
        <Button
          color="primary"
          fullWidth
          type="submit"
          variant="contained"
          onClick={(event) => {
            event.preventDefault();
            formik.handleSubmit();
          }}
        >
          <span>Reset Password</span>
          {userFetchStatus === LOADING && (
            <CircularProgress size={20} className="spinner" />
          )}
        </Button>
      </Box>
    </form>
  );

  const successMsg = <p>You will receive an e-mail with reset password link</p>;

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center"
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        {userFetchStatus === SUCCESS ? successMsg : resetForm}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
