import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { FETCH_STATE } from "../../const/Common";
import { getTokenFetchState } from "./Tokenselectors";

const { LOADING } = FETCH_STATE;

export const userFetchState = (state: RootState): FETCH_STATE =>
  state.UserReducer.userFetchState;

export const isUserDataLoading = createSelector(
  [userFetchState, getTokenFetchState],
  (userState, tokenState): boolean =>
    userState === LOADING || tokenState === LOADING
);

export const userRegisterState = (state: RootState) =>
  state.UserReducer.registerState;

export const currentUserProfile = (state: RootState) =>
  state.UserReducer.userProfile;
