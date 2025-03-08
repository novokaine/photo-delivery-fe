import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import ImageListReducer from "./reducers/ImageListReducer";
import TokenReducer from "./reducers/TokenReducers";

export const store = configureStore({
  reducer: {
    UserReducer,
    ImageListReducer,
    TokenReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
