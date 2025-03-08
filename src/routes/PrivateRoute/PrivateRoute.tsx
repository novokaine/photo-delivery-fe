import React, { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { getRefreshTokenAction } from "../../redux/actions/TokenActions";
import { currentAccessToken } from "../../redux/selectors/Tokenselectors";
import { isUserDataLoading } from "../../redux/selectors/UserSelectors";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps): any => {
  const { children } = props;
  const accessToken = useSelector(currentAccessToken);
  const dispatch = useDispatch<AppDispatch>();
  const isUserLoading = useSelector(isUserDataLoading);

  useLayoutEffect(() => {
    if (isUserLoading) return;
    if (!accessToken) dispatch(getRefreshTokenAction());
  }, [accessToken, isUserLoading, dispatch]);

  if (isUserLoading) return <p>Loading</p>;

  return accessToken ? children : <Navigate to="/login" replace />;
  // return accessToken ? children : <Outlet />;
};

export default PrivateRoute;
