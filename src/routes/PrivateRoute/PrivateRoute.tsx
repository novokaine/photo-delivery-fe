import React, { JSX, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { getRefreshTokenAction } from "../../redux/actions/TokenActions";
import { currentAccessToken } from "../../redux/selectors/Tokenselectors";
import {
  currentUserProfile,
  isUserDataLoading
} from "../../redux/selectors/UserSelectors";
import LayoutWrapper from "../../components/LayoutWrapper";
import Loader from "../../components/Loader";
import { getUserProfileAction } from "../../redux/actions/UserActions";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children
}): JSX.Element => {
  const accessToken = useSelector(currentAccessToken);
  const isUserLoading = useSelector(isUserDataLoading);
  const userProfile = useSelector(currentUserProfile);

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    if (isUserLoading) return;
    if (!accessToken) dispatch(getRefreshTokenAction());
    if (!userProfile) dispatch(getUserProfileAction());
  }, [accessToken, isUserLoading, userProfile, dispatch]);

  if (isUserLoading) return <Loader />;

  return accessToken ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
