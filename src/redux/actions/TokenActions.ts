import { AppThunk } from "..";
import api from "../../api/Api";
import { IDLE, LOADING } from "../../const/Common";
import {
  updateAccessToken,
  updateTokenFetchState
} from "../reducers/TokenReducers";
import { updateUserFetchState } from "../reducers/UserReducer";
import { getUserProfileAction } from "./UserActions";

export const getRefreshTokenAction = (): AppThunk => (dispatch) => {
  dispatch(updateUserFetchState(LOADING));
  dispatch(updateTokenFetchState(LOADING));

  api
    .getRefreshToken()
    .then(({ accessToken }: { accessToken: string }) => {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateTokenFetchState(IDLE));
      dispatch(updateUserFetchState(IDLE));
      dispatch(getUserProfileAction());
    })
    .catch(() => {
      dispatch(updateAccessToken(null));
      dispatch(updateTokenFetchState(IDLE));
      dispatch(updateUserFetchState(IDLE));
    });
};
