import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/Authentication";
import ImageListReducer from "./reducers/ImageListReducer";

export const store = configureStore({
  reducer: {
    AuthReducer,
    ImageListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
