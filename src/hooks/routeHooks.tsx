import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, useLocation } from "react-router-dom";
import { Button, ListItem, ListItemText } from "@mui/material";
import { RoutesTypes } from "../routes/Types/RouteCommonTypes";
import {
  currentUserProfile,
  isUserDataLoading
} from "../redux/selectors/UserSelectors";
import {
  adminRoutes,
  internalRoutes,
  PASSWORD_RESET,
  privateRoutes,
  publicRoutes
} from "../routes";
import PrivateRoute from "../routes/PrivateRoute";

const getRoutes = ({ routes }: { routes: RoutesTypes[] }) =>
  routes.map(({ isPrivate, path, Component }) => (
    <Route
      key={path}
      path={path}
      element={
        isPrivate ? (
          <PrivateRoute>
            <Component />
          </PrivateRoute>
        ) : (
          <Component />
        )
      }
    />
  ));

const useGetUpdatedRoutes = ({
  accessToken
}: {
  accessToken: string | null;
}): RoutesTypes[] => {
  const userProfile = useSelector(currentUserProfile);
  const isUserLoading = useSelector(isUserDataLoading);
  const [routes, setRoutes] = useState<RoutesTypes[]>(publicRoutes);

  useEffect(() => {
    if (!accessToken || isUserLoading) {
      setRoutes(publicRoutes);
      return;
    }

    const isAdmin = userProfile?.isAdmin;
    const resetPasswordRoute = publicRoutes.find(
      ({ path }) => path === PASSWORD_RESET
    );

    const commonRoutes = resetPasswordRoute
      ? [{ ...resetPasswordRoute, isPrivate: true }]
      : [];

    setRoutes(
      isAdmin
        ? [...privateRoutes, ...commonRoutes, ...adminRoutes]
        : [...privateRoutes, ...commonRoutes]
    );
  }, [accessToken, userProfile, isUserLoading]);

  return routes;
};

const useGetUserRoutes = ({ routes }: { routes: RoutesTypes[] }) => {
  const location = useLocation();

  return routes.map(({ path, name }) => (
    <ListItem key={path} disablePadding>
      <Button>
        <Link
          to={path}
          className={location.pathname.startsWith(path) ? "active" : ""}
        >
          <ListItemText primary={name} />
        </Link>
      </Button>
    </ListItem>
  ));
};

const useGetNavigationRoutes = () => {
  const userData = useSelector(currentUserProfile);
  const isAdmin = userData?.isAdmin;

  const userRoutes = useGetUserRoutes({ routes: internalRoutes });

  const administratorRoutes = useGetUserRoutes({
    routes: [...adminRoutes, ...internalRoutes]
  });

  return isAdmin ? administratorRoutes : userRoutes;
};

export { useGetNavigationRoutes, useGetUpdatedRoutes, getRoutes };
