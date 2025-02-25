import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import { isUserAuthenticathed } from "../../hooks/authentication";
import { updateLoginState } from "../reducers/Authentication";

export const loginAction =
  ({ userName, password }: { userName: string; password: string }): AppThunk =>
  (dispatch, getState) => {
    if (isUserAuthenticathed) return;

    dispatch(updateLoginState(FETCH_STATE.LOADING));

    api
      .login({ userName, password })
      .then((res) => {
        console.log(res);
        dispatch(updateLoginState(FETCH_STATE.IDLE));
      })
      .catch(() => dispatch(updateLoginState(FETCH_STATE.ERROR)));
  };
