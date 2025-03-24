import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux";
import Loader from "./components/Loader";
import NotFound from "./routes/NotFound";
import { isUserDataLoading } from "./redux/selectors/UserSelectors";
import { getRefreshTokenAction } from "./redux/actions/TokenActions";
import { currentAccessToken } from "./redux/selectors/Tokenselectors";
import {
  getRoutes,
  useCanGetNewToken,
  useGetUpdatedRoutes
} from "./routes/RoutesHooks";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(currentAccessToken);
  const isUserLoading = useSelector(isUserDataLoading);

  const routes = getRoutes({
    routes: useGetUpdatedRoutes({ accessToken })
  });

  const canGetNewToken = useCanGetNewToken();

  useEffect(() => {
    if (accessToken || !canGetNewToken) return;
    dispatch(getRefreshTokenAction());
  }, [accessToken, canGetNewToken, dispatch]);

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
