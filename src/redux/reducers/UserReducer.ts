import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";
import { UserReducerType } from "../Types/UserDataTypes";

const { IDLE } = FETCH_STATE;

const initialState: UserReducerType = {
  loginState: IDLE,
  registerState: IDLE,
  isUserLoggedIn: false
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    // Register
    updateRegisterState: (
      nextState,
      { payload }: PayloadAction<FETCH_STATE>
    ) => {
      nextState.registerState = payload;
    },

    updateUserFetchState: (
      nextState,
      { payload }: PayloadAction<FETCH_STATE>
    ) => {
      nextState.loginState = payload;
    },

    updateUserLoginState: (nextState, { payload }: PayloadAction<boolean>) => {
      nextState.isUserLoggedIn = payload;
    }
  }
});

export const {
  updateRegisterState,
  updateUserFetchState,
  updateUserLoginState
} = UserReducer.actions;

export default UserReducer.reducer;
