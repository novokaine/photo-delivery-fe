import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutWrapper from "../../components/LayoutWrapper";
import { LOGIN } from "..";
import { getCurrentToken } from "../../redux/selectors/TokenSelectors";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children
}): JSX.Element => {
  const location = useLocation();
  const currentToken = useSelector(getCurrentToken);

  return currentToken ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
