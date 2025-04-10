import React, { JSX, useLayoutEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../components/LayoutWrapper";
import Loader from "../../components/Loader";
import { LOADING } from "../../const/Common";
import { LOGIN } from "..";
import { AppDispatch } from "../../redux";
import { checkAuthStatusAction } from "../../redux/actions/UserActions";
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
  const dispatch = useDispatch<AppDispatch>();

  const shouldCheckAuth = localStorage.getItem("shouldCheckAuth") === "true";

  useLayoutEffect(() => {
    if (!shouldCheckAuth) return;
    dispatch(checkAuthStatusAction());
  }, [shouldCheckAuth, dispatch]);

  if (tokenFetchState === LOADING) return <Loader />;

  return currentToken ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
