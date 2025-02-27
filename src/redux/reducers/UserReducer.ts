import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";
import { AUTH_VALUES } from "../../hooks/authentication";

const { IDLE, ERROR } = FETCH_STATE;
const { AUTH_TOKEN, TOKEN_EXPIRES } = AUTH_VALUES;

const initialState = {
  loginState: IDLE,
  registerState: IDLE
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    // Register
    updateRegisterState: (nextState, { payload }) => {
      nextState.registerState = payload;
    },

    // Login
    updateLoginState: (nextState, { payload }) => {
      nextState.loginState = payload;

      if (payload === ERROR && localStorage.getItem(AUTH_TOKEN)) {
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
    },

    logoutSuccess: () => {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(TOKEN_EXPIRES);
    }
  }
});

export const {
  updateRegisterState,
  updateLoginState,
  loginSuccess,
  logoutSuccess
} = UserReducer.actions;

export default UserReducer.reducer;
