import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";
import { UserProfileType, UserReducerType } from "../Types/UserDataTypes";

const { IDLE } = FETCH_STATE;

const initialState: UserReducerType = {
  userFetchState: IDLE,
  registerState: IDLE,
  userProfile: null
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
      nextState.userFetchState = payload;
    },

    updateUserProfile: (
      nextState,
      { payload }: PayloadAction<UserProfileType>
    ) => {
      nextState.userProfile = payload;
    }
  }
});

export const { updateRegisterState, updateUserFetchState, updateUserProfile } =
  UserReducer.actions;

export default UserReducer.reducer;
