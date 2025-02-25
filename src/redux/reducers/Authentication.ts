import { createSlice } from "@reduxjs/toolkit";
import { AUTH_VALUES, isUserAuthenticathed } from "../../hooks/authentication";
import { FETCH_STATE } from "../../const/Common";

const { IDLE, ERROR } = FETCH_STATE;
const { AUTH_TOKEN, TOKEN_EXPIRES } = AUTH_VALUES;

const initialState = {
  loginState: IDLE,
  isAuthenticathed: isUserAuthenticathed
};

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    updateLoginState: (nextState, { payload }) => {
      nextState.loginState = payload;

      if (payload === ERROR && localStorage.getItem(AUTH_TOKEN)) {
        nextState.isAuthenticathed = false;
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(TOKEN_EXPIRES);
      }
    },

    loginSuccess: (nextState, { payload }) => {
      localStorage.setItem(AUTH_TOKEN, payload);
      localStorage.setItem(
        TOKEN_EXPIRES,
        (Date.now() + 3600 * 1000) as unknown as string
      );
      nextState.isAuthenticathed = true;
    },

    logoutSuccess: (nextState) => {
      nextState.isAuthenticathed = false;
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(TOKEN_EXPIRES);
    }
  }
});

export const { updateLoginState, loginSuccess, logoutSuccess } =
  AuthReducer.actions;
export default AuthReducer.reducer;
