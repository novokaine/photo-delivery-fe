import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RoutesReducer from "./reducers/RoutesReducer";
import UserReducer from "./reducers/UserReducer";
import PhotoReducer from "./reducers/PhotoReducer";
import TokenReducer from "./reducers/TokenReducer";
import { createLogger } from "redux-logger";

const isDevEnv = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    RoutesReducer,
    UserReducer,
    PhotoReducer,
    TokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    isDevEnv
      ? getDefaultMiddleware().concat(createLogger({ collapsed: true }))
      : getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
