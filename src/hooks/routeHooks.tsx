import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, Route, useLocation } from "react-router-dom";
import { Button, ListItem, ListItemText } from "@mui/material";
import { RoutesTypes } from "../routes/Types/RouteCommonTypes";
import { currentUserProfile } from "../redux/selectors/UserSelectors";
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

  const availableRoutes = useMemo(() => {
    if (!accessToken) return publicRoutes;

    const isAdmin = userProfile?.isAdmin;
    const resetPasswordRoute = publicRoutes.find(
      ({ path }) => path === PASSWORD_RESET
    );

    if (resetPasswordRoute) {
      resetPasswordRoute.isPrivate = true;
    }

    return isAdmin
      ? [...privateRoutes, resetPasswordRoute, ...adminRoutes]
      : privateRoutes;
  }, [accessToken, userProfile]);

  return availableRoutes as RoutesTypes[];
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
