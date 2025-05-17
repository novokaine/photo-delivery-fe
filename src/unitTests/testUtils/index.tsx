/**
 * Will export a store wrapper in order to test components
 */

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../../redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState = {}, ...renderOptions } = {}
) => {
  const store = configureStore({ reducer, preloadedState });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
