import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminRoutes, routes } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import Loader from "./components/Loader";
import NotFound from "./routes/NotFound";
import { currentUserProfile } from "./redux/selectors/UserSelectors";
import { RoutesTypes } from "./routes/Types/RouteCommonTypes";
import { AppDispatch } from "./redux";
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

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(currentUserProfile);

  const isAdmin = userProfile?.isAdmin;
  const availableRoutes = isAdmin ? [...routes, ...adminRoutes] : routes;
  const routeElements = getRoutes({ routes: availableRoutes });
  const accessToken = useSelector(currentAccessToken);

  useEffect(() => {
    if (accessToken) return;
    dispatch(getRefreshTokenAction());
  }, [accessToken, dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routeElements}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
