import React, { JSX, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAccessToken } from "../../redux/selectors/Tokenselectors";
import LayoutWrapper from "../../components/LayoutWrapper";
import Loader from "../../components/Loader";
import { LOGIN } from "..";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children
}): JSX.Element => {
  const accessToken = useSelector(currentAccessToken);

  return (
    <Suspense fallback={<Loader />}>
      {accessToken ? (
        <LayoutWrapper>{children}</LayoutWrapper>
      ) : (
        <Navigate to={LOGIN} replace />
      )}
    </Suspense>
  );
};

export default PrivateRoute;
