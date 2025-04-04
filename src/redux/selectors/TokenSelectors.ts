import { RootState } from "..";

export const getTokenFetchState = (state: RootState) =>
  state.TokenReducer.tokenFetchState;

export const getCurrentToken = (state: RootState) =>
  state.TokenReducer.accessToken;
