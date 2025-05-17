import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutWrapper from "../../components/LayoutWrapper";
import Loader from "../../components/Loader";
import { LOADING } from "../../const/Common";
import { LOGIN } from "..";
import {
  getCurrentToken,
  getTokenFetchState
} from "../../redux/selectors/TokenSelectors";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children
}): JSX.Element => {
  const location = useLocation();
  const tokenFetchState = useSelector(getTokenFetchState);
  const currentToken = useSelector(getCurrentToken);

  if (tokenFetchState === LOADING) return <Loader />;

  return currentToken ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
