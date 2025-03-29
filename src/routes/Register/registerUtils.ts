import { useFormik } from "formik";
import * as Yup from "yup";
import { UserDataTypes } from "../../redux/Types/UserDataTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { registerAction } from "../../redux/actions/UserActions";

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
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
  return { formik };
};
