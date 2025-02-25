import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux";

import PageLayout from "./components/PageLayout";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <PageLayout>
    <Provider store={store}>
      <App />
    </Provider>
  </PageLayout>
);
