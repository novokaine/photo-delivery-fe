import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux";
import {
  adminRoutes,
  PASSWORD_RESET,
  privateRoutes,
  publicRoutes
} from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import Loader from "./components/Loader";
import NotFound from "./routes/NotFound";
import {
  currentUserProfile,
  isUserDataLoading
} from "./redux/selectors/UserSelectors";
import { RoutesTypes } from "./routes/Types/RouteCommonTypes";
import { getRefreshTokenAction } from "./redux/actions/TokenActions";
import { currentAccessToken } from "./redux/selectors/Tokenselectors";

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

  const availableRoutes = isAdmin
    ? [...privateRoutes, ...resetPasswordRoute, ...adminRoutes]
    : privateRoutes;

  return availableRoutes;
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(currentAccessToken);
  const isUserLoading = useSelector(isUserDataLoading);

  const routes = getRoutes({
    routes: useGetUpdatedRoutes({ accessToken })
  });

  useEffect(() => {
    if (accessToken) return;
    dispatch(getRefreshTokenAction());
  }, [accessToken, dispatch]);

  if (isUserLoading) return <Loader />;

  return (
    <Router>
      <Routes>
        {routes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
