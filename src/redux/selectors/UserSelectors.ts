import { RootState } from "..";

export const userLoginState = (state: RootState) =>
  state.UserReducer.loginState;

export const userRegisterState = (state: RootState) =>
  state.UserReducer.registerState;
