import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

const getRoutes = routes.map(({ isPrivate, path, Component }) => (
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

const App = () => (
  <Router>
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>{getRoutes}</Routes>
    </Suspense>
  </Router>
);

export default App;
