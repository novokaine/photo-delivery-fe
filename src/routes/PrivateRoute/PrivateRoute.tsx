import React from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/authentication";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps): any => {
  const { children } = props;
  const { isUserAuthenticathed } = useIsAuthenticated();
  return isUserAuthenticathed ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
