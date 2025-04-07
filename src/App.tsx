import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFound";
import { getRoutes } from "./routes/RoutesHooks";
import { routes } from "./routes/index";

const App = () => {
  const availableRoutes = getRoutes({ routes });

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
