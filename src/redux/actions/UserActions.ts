import { AppThunk } from "..";
import api from "../../api/Api";
import { IDLE, LOADING, SUCCESS, ERROR } from "../../const/Common";
import {
  updateUserFetchState,
  updateUserProfile
} from "../reducers/UserReducer";
import { updateRegisterState } from "../reducers/UserReducer";
import { UserDataTypes } from "../Types/UserDataTypes";
import { userFetchState } from "../selectors/UserSelectors";

export const registerAction =
  ({ email, userName, password }: UserDataTypes): AppThunk =>
  (dispatch) => {
    if (!userName || !password) {
      return;
    }

    dispatch(updateRegisterState(LOADING));
    api
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
    api
      .login({ userName, password })
      .then(({ userData }) => {
        dispatch(updateUserProfile(userData));
        dispatch(updateUserFetchState(SUCCESS));
      })
      .catch(() => {
        dispatch(updateUserProfile(null));
        dispatch(updateUserFetchState(ERROR));
      });
  };

export const checkAuthStatusAction = (): AppThunk => (dispatch) => {
  dispatch(updateUserFetchState(LOADING));
  api
    .checkAuthStatus()
    .then(({ userData }) => {
      dispatch(updateUserProfile(userData));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch(() => {
      dispatch(updateUserProfile(null));
      dispatch(updateUserFetchState(IDLE));
    });
};

export const logoutAction = (): AppThunk => (dispatch) => {
  dispatch(updateUserFetchState(LOADING));
  api
    .logout()
    .then(() => {
      dispatch(updateUserProfile(null));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch(() => dispatch(updateUserFetchState(ERROR)));
};

export const resetPasswordAction =
  ({ email }: { email: string }): AppThunk =>
  (dispatch) => {
    dispatch(updateUserFetchState(LOADING));
    api.passwordReset({ email }).then(() => {
      dispatch(updateUserFetchState(SUCCESS));
    });
  };

export const getUserProfileAction = (): AppThunk => (dispatch, getState) => {
  const userState = userFetchState(getState());

  if (userState === LOADING) return;
  dispatch(updateUserFetchState(LOADING));

  api
    .get("/user-profile")
    .then(({ message: { username, email, isAdmin } }) => {
      dispatch(updateUserProfile({ username, email, isAdmin }));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch(() => {
      dispatch(updateUserFetchState(ERROR));
    });
};
