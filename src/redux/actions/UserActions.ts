import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import {
  updateUserAdminState,
  updateUserFetchState
} from "../reducers/UserReducer";
import { updateAccessToken } from "../reducers/TokenReducers";
import { updateRegisterState } from "../reducers/UserReducer";
import { UserDataTypes } from "../Types/UserDataTypes";

const { LOADING, SUCCESS, IDLE, ERROR } = FETCH_STATE;

export const registerAction =
  ({ userName, password }: UserDataTypes): AppThunk =>
  (dispatch) => {
    if (!userName || !password) {
      return;
    }

    dispatch(updateRegisterState(LOADING));

    api
      .register({ userName, password })
      .then(() => {
        dispatch(updateRegisterState(SUCCESS));
      })
      .catch(() => {
        dispatch(updateRegisterState(ERROR));
      });
  };

export const loginAction =
  ({ userName, password }: UserDataTypes): AppThunk =>
  (dispatch) => {
    dispatch(updateUserFetchState(LOADING));
    api
      .login({ userName, password })
      .then(({ accessToken, isAdmin }) => {
        if (isAdmin) dispatch(updateUserAdminState(isAdmin));

        dispatch(updateAccessToken(accessToken));
        dispatch(updateUserFetchState(SUCCESS));
      })
      .catch((err) => {
        dispatch(updateAccessToken(null));
        dispatch(updateUserFetchState(ERROR));
      });
  };

export const logoutAction = (): AppThunk => (dispatch) => {
  dispatch(updateUserFetchState(LOADING));
  api
    .logout()
    .then(() => {
      dispatch(updateAccessToken(null));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch(() => dispatch(updateUserFetchState(ERROR)));
};

export const getUserProfileAction = (): AppThunk => (dispatch, getState) => {
  dispatch(updateUserFetchState(LOADING));
  api
    .get("/user-profile")
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
