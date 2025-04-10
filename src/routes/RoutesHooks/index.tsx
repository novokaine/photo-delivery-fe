import { Route } from "react-router-dom";
import { RoutesTypes } from "../Types/RouteCommonTypes";
import PrivateRoute from "../PrivateRoute";
import { privateRoutes, adminRoutes } from "..";

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

const getRoutesByRole = ({ isAdmin }: { isAdmin: boolean | undefined }) => {
  const currentRoutes = isAdmin
    ? [...privateRoutes, ...adminRoutes]
    : privateRoutes;

  const availableRoutes = currentRoutes.map(({ name, path, isPrivate }) => ({
    name,
    path,
    isPrivate
  }));

  return { currentRoutes, availableRoutes };
};

export { getRoutes, getRoutesByRole };
