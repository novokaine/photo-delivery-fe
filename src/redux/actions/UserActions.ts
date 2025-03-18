import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import {
  updateUserFetchState,
  updateUserProfile
} from "../reducers/UserReducer";
import { updateAccessToken } from "../reducers/TokenReducers";
import { updateRegisterState } from "../reducers/UserReducer";
import { UserDataTypes } from "../Types/UserDataTypes";
import { userFetchState } from "../selectors/UserSelectors";

const { LOADING, SUCCESS, IDLE, ERROR } = FETCH_STATE;

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
      .then(({ accessToken }) => {
        dispatch(updateAccessToken(accessToken));
        dispatch(updateUserFetchState(SUCCESS));
      })
      .then(() => dispatch(getUserProfileAction()))
      .catch(() => {
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
  const userState = userFetchState(getState());

  if (userState === LOADING) return;
  dispatch(updateUserFetchState(LOADING));

  api
    .get("/user-profile")
    .then(({ message: { username, isAdmin } }) => {
      dispatch(updateUserProfile({ username, isAdmin }));
      dispatch(updateUserFetchState(IDLE));
    })
    .catch((err) => {
      dispatch(updateUserFetchState(ERROR));
    });
};
