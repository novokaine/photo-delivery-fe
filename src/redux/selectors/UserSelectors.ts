import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { FETCH_STATE } from "../../const/Common";
import { getTokenFetchState } from "./Tokenselectors";

const { LOADING } = FETCH_STATE;

export const userLoginState = (state: RootState): FETCH_STATE =>
  state.UserReducer.loginState;

export const isUserDataLoading = createSelector(
  [userLoginState, getTokenFetchState],
  (userState, tokenState): boolean =>
    userState === LOADING || tokenState === LOADING
);

export const getUserLoginState = (state: RootState) =>
  state.UserReducer.isUserLoggedIn;

export const userRegisterState = (state: RootState) =>
  state.UserReducer.registerState;
