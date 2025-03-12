import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux";
import App from "./App";

import "./css/main.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
