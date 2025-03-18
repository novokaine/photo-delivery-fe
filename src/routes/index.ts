import { lazy } from "react";
import { RoutesTypes } from "./Types/RouteCommonTypes";
import Login from "./Login";

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

const privateRoutes: RoutesTypes[] = [
  {
    path: "/dashboard",
    Component: DashBoard,
    name: "Dashboard",
    isPrivate: true
  },
  {
    path: "/user-profile",
    Component: UserProfile,
    name: "Profile",
    isPrivate: true
  }
];

const publicRoutes: RoutesTypes[] = [
  {
    path: "/login",
    Component: Login,
    name: "Login",
    isPrivate: false
  },
  {
    path: "/register",
    Component: Register,
    name: "Register",
    isPrivate: false
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
    name: "Reset Password",
    isPrivate: false
  }
];

export const routes: RoutesTypes[] = [...privateRoutes, ...publicRoutes];
