import { lazy } from "react";
import { RoutesTypes } from "./Types/RouteCommonTypes";
import Login from "./Login";

const ROUTES_PATH = {
  DASHBOARD: "/dashboard",
  USER_PROFILE: "/user-profile",
  LOGIN: "/login",
  REGISTER: "/register",
  PASSWORD_RESET: "/reset-password",
  UPLOAD_PHOTOS: "/upload-photos"
};

export const {
  DASHBOARD,
  USER_PROFILE,
  LOGIN,
  REGISTER,
  PASSWORD_RESET,
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

// const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const DashBoard = lazy(() => import("./Dashboard"));
const UserProfile = lazy(() => import("./UserProfile"));
const ResetPassword = lazy(() => import("./ResetPasswrd"));
const PhotoUpload = lazy(() => import("./PhotoUpload"));

const privateRoutes: RoutesTypes[] = [
  {
    path: DASHBOARD,
    Component: DashBoard,
    name: "Dashboard",
    isPrivate: true
  },
  {
    path: USER_PROFILE,
    Component: UserProfile,
    name: "Profile",
    isPrivate: true
  }
];

const publicRoutes: RoutesTypes[] = [
  {
    path: LOGIN,
    Component: Login,
    name: "Login",
    isPrivate: false
  },
  {
    path: REGISTER,
    Component: Register,
    name: "Register",
    isPrivate: false
  },
  {
    path: PASSWORD_RESET,
    Component: ResetPassword,
    name: "Reset Password",
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
