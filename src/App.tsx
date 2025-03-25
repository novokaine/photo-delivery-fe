import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux";
import Loader from "./components/Loader";
import NotFound from "./routes/NotFound";
import { userFetchState } from "./redux/selectors/UserSelectors";
import { getRoutes } from "./routes/RoutesHooks";
import { checkAuthStatusAction } from "./redux/actions/UserActions";
import { routes } from "./routes/index";
import { LOADING } from "./const/Common";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isUserLoading = useSelector(userFetchState) === LOADING;
  const availableRoutes = getRoutes({ routes });

  useEffect(() => {
    dispatch(checkAuthStatusAction());
  }, [dispatch]);

  if (isUserLoading) return <Loader />;

  return (
    <Router>
      <Routes>
        {availableRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
