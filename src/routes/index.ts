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

export const routes: RoutesTypes[] = [
  {
    path: "/login",
    Component: Login,
    isPrivate: false
  },
  {
    path: "/register",
    Component: Register,
    isPrivate: false
  },
  {
    path: "/dashboard",
    Component: DashBoard,
    isPrivate: true
  },
  {
    path: "/user-profile",
    Component: UserProfile,
    isPrivate: true
  }
];
