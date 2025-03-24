import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RoutesTypes } from "../Types/RouteCommonTypes";
import { currentUserProfile } from "../../redux/selectors/UserSelectors";
import {
  adminRoutes,
  internalRoutes,
  PASSWORD_RESET,
  privateRoutes,
  publicRoutes
} from "..";
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

const useGetUpdatedRoutes = ({
  accessToken
}: {
  accessToken: string | null;
}): RoutesTypes[] => {
  const userProfile = useSelector(currentUserProfile);

  if (!accessToken) return publicRoutes;
  const isAdmin = userProfile?.isAdmin;

  const resetPasswordRoute = publicRoutes.filter(
    ({ path }) => path === PASSWORD_RESET
  );

  resetPasswordRoute[0].isPrivate = true;

  const commonRoutes = [...privateRoutes, ...internalRoutes];

  const availableRoutes = isAdmin
    ? [...commonRoutes, ...adminRoutes]
    : [...commonRoutes, ...resetPasswordRoute];

  return availableRoutes;
};

export { useGetUpdatedRoutes, getRoutes };
