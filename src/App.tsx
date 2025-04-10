import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFound";
import { getRoutes, getRoutesByRole } from "./routes/RoutesHooks";
import { publicRoutes } from "./routes/index";
import DashBoard from "./routes/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUserProfile,
  userFetchState
} from "./redux/selectors/UserSelectors";
import { useEffect, useLayoutEffect, useState } from "react";
import { LOADING } from "./const/Common";
import { RoutesTypes } from "./routes/Types/RouteCommonTypes";
import { AppDispatch } from "./redux";
import { checkAuthStatusAction } from "./redux/actions/UserActions";
import Loader from "./components/Loader";
import Login from "./routes/Login";
import { updateRoutes } from "./redux/reducers/RoutesReducer";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentRoutes, setCurrentRoutes] =
    useState<RoutesTypes[]>(publicRoutes);

  const userData = useSelector(currentUserProfile);
  const fetchUserState = useSelector(userFetchState);
  const shouldCheckAuth = localStorage.getItem("shouldCheckAuth") === "true";

  const isLayoutReady =
    !shouldCheckAuth || (fetchUserState !== LOADING && !!userData);

  useLayoutEffect(() => {
    if (!shouldCheckAuth) return;
    dispatch(checkAuthStatusAction());
  }, [shouldCheckAuth, dispatch]);

  useEffect(() => {
    if (!userData) return;

    const { currentRoutes, availableRoutes } = getRoutesByRole({
      isAdmin: userData?.isAdmin
    });
    setCurrentRoutes(currentRoutes);
    dispatch(updateRoutes(availableRoutes));

    return function () {
      setCurrentRoutes(publicRoutes);
      dispatch(updateRoutes([]));
    };
  }, [userData, dispatch]);
  console.log(isLayoutReady);
  if (!isLayoutReady) return <Loader />;

  const availableRoutes = getRoutes({ routes: currentRoutes });

  return (
    <Router>
      <Routes>
        {availableRoutes}
        <Route
          path="/"
          element={
            shouldCheckAuth ? (
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            ) : (
              <Login />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
