import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFound";
import { getRoutes } from "./routes/RoutesHooks";
import { routes } from "./routes/index";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentToken,
  getTokenFetchState
} from "./redux/selectors/TokenSelectors";
import { LOADING } from "./const/Common";
import { AppDispatch } from "./redux";
import { checkAuthStatusAction } from "./redux/actions/UserActions";
import Loader from "./components/Loader";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const availableRoutes = getRoutes({ routes });
  const tokenFetchState = useSelector(getTokenFetchState);
  const currentToken = useSelector(getCurrentToken);

  useLayoutEffect(() => {
    if (currentToken || tokenFetchState === LOADING) return;
    dispatch(checkAuthStatusAction());
  }, [tokenFetchState, currentToken, dispatch]);

  if (tokenFetchState === LOADING) return <Loader />;

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
