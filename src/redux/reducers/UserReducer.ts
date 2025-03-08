import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";
import { UserReducerType } from "../Types/UserDataTypes";

const { IDLE } = FETCH_STATE;

const initialState: UserReducerType = {
  loginState: IDLE,
  registerState: IDLE
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
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
    }
  }
});

export const { updateRegisterState, updateUserFetchState } =
  UserReducer.actions;

export default UserReducer.reducer;
