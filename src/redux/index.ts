import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import PhotoReducer from "./reducers/PhotoReducer";
import { createLogger } from "redux-logger";

const isDevEnv = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    UserReducer,
    PhotoReducer
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
