import { Route } from "react-router-dom";
import { RoutesTypes } from "../Types/RouteCommonTypes";
import PrivateRoute from "../PrivateRoute";

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

export { getRoutes };
