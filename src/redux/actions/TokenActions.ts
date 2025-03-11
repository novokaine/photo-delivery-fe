import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import {
  updateAccessToken,
  updateTokenFetchState
} from "../reducers/TokenReducers";

export const getRefreshTokenAction = (): AppThunk => (dispatch) => {
  dispatch(updateTokenFetchState(FETCH_STATE.LOADING));

  api
    .getRefreshToken()
    .then(({ accessToken }: { accessToken: string }) => {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateTokenFetchState(FETCH_STATE.IDLE));
    })
    .catch(() => {
      dispatch(updateAccessToken(null));
      dispatch(updateTokenFetchState(FETCH_STATE.ERROR));
    });
};
