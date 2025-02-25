import { RootState } from "..";

export const loginStateSelector = (state: RootState) =>
  state.AuthReducer.loginState;
