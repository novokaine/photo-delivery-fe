import { AppThunk } from "..";
import api from "../../api/Api";
import { ERROR, IDLE, LOADING } from "../../const/Common";
import {
  updateAccessToken,
  updateTokenFetchState
} from "../reducers/TokenReducers";

export const getRefreshTokenAction = (): AppThunk => (dispatch) => {
  dispatch(updateTokenFetchState(LOADING));

  api
    .getRefreshToken()
    .then(({ accessToken }: { accessToken: string }) => {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateTokenFetchState(IDLE));
    })
    .catch(() => {
      dispatch(updateAccessToken(null));
      dispatch(updateTokenFetchState(ERROR));
    });
};
