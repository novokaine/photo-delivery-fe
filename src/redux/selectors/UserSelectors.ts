import { RootState } from "..";
import { FETCH_STATE } from "../../const/Common";

export const userFetchState = (state: RootState): FETCH_STATE =>
  state.UserReducer.userFetchState;

export const userRegisterState = (state: RootState): FETCH_STATE =>
  state.UserReducer.registerState;

export const currentUserProfile = (state: RootState) =>
  state.UserReducer.userProfile;
