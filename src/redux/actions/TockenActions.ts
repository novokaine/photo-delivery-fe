import { AppThunk } from "..";
import { getAccessToken } from "../../api/Common";
import { ERROR, IDLE, LOADING } from "../../const/Common";
import {
  updateAccessToken,
  updateTokenFetchState
} from "../reducers/TokenReducer";

export const getAccessTokenAction = (): AppThunk => (dispatch, getState) => {
  dispatch(updateTokenFetchState(LOADING));
  getAccessToken()
    .then(({ accessToken }) => {
      dispatch(updateAccessToken(accessToken));
      dispatch(updateTokenFetchState(IDLE));
    })
    .catch(() => {
      dispatch(updateAccessToken(null));
      dispatch(updateTokenFetchState(ERROR));
    });
};
