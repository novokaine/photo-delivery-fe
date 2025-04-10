import { AppThunk } from "..";
import api from "../../api/Api";
import { IDLE, LOADING, SUCCESS, ERROR } from "../../const/Common";
import {
  updateUserFetchState,
  updateUserProfile
} from "../reducers/UserReducer";
import { updateRegisterState } from "../reducers/UserReducer";
import { UserDataTypes } from "../Types/UserDataTypes";
import { currentUserProfile, userFetchState } from "../selectors/UserSelectors";
import {
  updateAccessToken,
  updateTokenFetchState
} from "../reducers/TokenReducer";
import { LOGIN } from "../../routes";
import userApi from "../../api/UserApi";
import { getCurrentToken } from "../selectors/TokenSelectors";

export const registerAction =
  ({ email, userName, password }: UserDataTypes): AppThunk =>
  (dispatch) => {
    if (!userName || !password) {
      return;
    }

    dispatch(updateRegisterState(LOADING));
    userApi
      .register({ email, userName, password })
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
    userApi
      .login({ userName, password })
      .then(({ userData, accessToken }) => {
        dispatch(updateUserProfile(userData));
        dispatch(updateAccessToken(accessToken));
        dispatch(updateUserFetchState(SUCCESS));
        dispatch(updateTokenFetchState(SUCCESS));
        localStorage.setItem("shouldCheckAuth", "true");
      })
      .catch(() => {
        dispatch(updateUserProfile(null));
        dispatch(updateUserFetchState(ERROR));
        dispatch(updateAccessToken(ERROR));
        localStorage.removeItem("shouldCheckAuth");
      });
  };

export const checkAuthStatusAction = (): AppThunk => (dispatch, getState) => {
  const userProfile = currentUserProfile(getState());
  const accessToken = getCurrentToken(getState());
  if (userProfile && accessToken) return;

  dispatch(updateUserFetchState(LOADING));
  dispatch(updateTokenFetchState(LOADING));

  userApi
    .checkAuthStatus()
    .then(({ userData, accessToken }) => {
      dispatch(updateUserProfile(userData));
      dispatch(updateAccessToken(accessToken));
      dispatch(updateUserFetchState(SUCCESS));
      dispatch(updateTokenFetchState(SUCCESS));
      localStorage.setItem("shouldCheckAuth", "true");
    })
    .catch(() => {
      dispatch(updateUserProfile(null));
      dispatch(updateAccessToken(null));
      dispatch(updateUserFetchState(ERROR));
      dispatch(updateTokenFetchState(ERROR));
      localStorage.setItem("shouldCheckAuth", "false");
    });
};

export const logoutAction = (): AppThunk => (dispatch) => {
  dispatch(updateUserFetchState(LOADING));
  userApi
    .logout()
    .then(() => {
      dispatch(updateUserProfile(null));
      dispatch(updateAccessToken(null));
      dispatch(updateUserFetchState(IDLE));
      dispatch(updateTokenFetchState(IDLE));
      localStorage.setItem("shouldCheckAuth", "false");
      window.location.href = LOGIN;
    })
    .catch(() => {
      localStorage.setItem("shouldCheckAuth", "false");
      dispatch(updateUserFetchState(ERROR));
    });
};

export const resetPasswordAction =
  ({ email }: { email: string }): AppThunk =>
  (dispatch) => {
    dispatch(updateUserFetchState(LOADING));
    userApi.passwordReset({ email }).then(() => {
      dispatch(updateUserFetchState(SUCCESS));
    });
  };

export const getUserProfileAction = (): AppThunk => (dispatch, getState) => {
  const userState = userFetchState(getState());

  if (userState === LOADING) return;
  dispatch(updateUserFetchState(LOADING));

  api
    .get("/user-profile")
    .then((response) => {
      // @ts-ignore
      const { username, email, isAdmin } = response.message;
      dispatch(updateUserProfile({ username, email, isAdmin }));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch(() => {
      dispatch(updateUserFetchState(ERROR));
    });
};
