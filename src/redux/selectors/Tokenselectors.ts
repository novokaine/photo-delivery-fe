import { RootState } from "..";

export const currentAccessToken = (state: RootState) =>
  state.TokenReducer.accessToken;

export const getTokenFetchState = (state: RootState) =>
  state.TokenReducer.tokenFetchState;
