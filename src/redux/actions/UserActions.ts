import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import { useIsAuthenticated } from "../../hooks/authentication";
import { updateLoginState } from "../reducers/UserReducer";
import { updateRegisterState } from "../reducers/UserReducer";
import { UserDataTypes } from "../Types/UserDataTypes";

export const registerAction =
  ({ userName, password }: UserDataTypes): AppThunk =>
  (dispatch, getState) => {
    if (!userName || !password) {
      return;
    }

    dispatch(updateRegisterState(FETCH_STATE.LOADING));

    api
      .register({ userName, password })
      .then((response) => {
        dispatch(updateRegisterState(FETCH_STATE.IDLE));
      })
      .catch((err) => {
        dispatch(updateRegisterState(FETCH_STATE.ERROR));
      });
  };

export const loginAction =
  ({ userName, password }: UserDataTypes): AppThunk =>
  (dispatch, getState) => {
    const { isUserAuthenticathed } = useIsAuthenticated();
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
