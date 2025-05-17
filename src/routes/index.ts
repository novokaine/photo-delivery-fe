import { lazy } from "react";
import { RoutesTypes } from "./Types/RouteCommonTypes";

const ROUTES_PATH = {
  LOGIN: "/",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  USER_PROFILE: "/user-profile",
  UPLOAD_PHOTOS: "/upload-photos"
};

export const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  DASHBOARD,
  USER_PROFILE,
  UPLOAD_PHOTOS
} = ROUTES_PATH;

// export const routes = {
//   home: "/",
//   login: "/login",
//   register: "/register",
//   dashboard: "/dashboard",
//   profile: "/profile",
//   settings: "/settings",
//   notFound: "/404",
//   serverError: "/500",
//   unauthorized: "/401",
//   forbidden: "/403",
//   badRequest: "/400",
//   internalServerError: "/500",
//   notImplemented: "/501",
//   badGateway: "/502"
// };

const Register = lazy(() => import("./Register"));
const UserProfile = lazy(() => import("./UserProfile"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const Resetpassword = lazy(() => import("./ResetPassword"));
const PhotoUpload = lazy(() => import("./PhotoUpload"));

export const privateRoutes: RoutesTypes[] = [
  {
    path: USER_PROFILE,
    Component: UserProfile,
    name: "Profile",
    isPrivate: true
  },
  {
    path: RESET_PASSWORD,
    Component: Resetpassword,
    name: "Reset Password",
    isPrivate: true
  }
];

export const publicRoutes: RoutesTypes[] = [
  {
    path: REGISTER,
    Component: Register,
    name: "Register",
    isPrivate: false
  },
  {
    path: FORGOT_PASSWORD,
    Component: ForgotPassword,
    name: "Forgot Password",
    isPrivate: false
  }
];

export const adminRoutes: RoutesTypes[] = [
  {
    path: UPLOAD_PHOTOS,
    Component: PhotoUpload,
    name: "Photo Upload",
    isPrivate: true,
    requiresAdmin: true
  }
];

export const routes: RoutesTypes[] = [...privateRoutes, ...publicRoutes];

export const internalRoutes = routes.filter(
  (route) => ![LOGIN, REGISTER].includes(route.path)
);
