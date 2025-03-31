import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutWrapper from "../../components/LayoutWrapper";
import Loader from "../../components/Loader";
import { LOADING } from "../../const/Common";
import { LOGIN } from "..";
import {
  currentUserProfile,
  userFetchState
} from "../../redux/selectors/UserSelectors";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children
}): JSX.Element => {
  const currentUserFetchState = useSelector(userFetchState);
  const userData = useSelector(currentUserProfile);

  if (currentUserFetchState === LOADING) return <Loader />;

  return userData ? (
    <LayoutWrapper>{children}</LayoutWrapper>
  ) : (
    <Navigate to={LOGIN} replace />
  );
};

export default PrivateRoute;
