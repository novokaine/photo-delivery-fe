import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";
import { TokenReducerTypes } from "../Types/TokenTypes";

const initialState: TokenReducerTypes = {
  tokenFetchState: FETCH_STATE.IDLE,
  accessToken: null
};

const TokenReducer = createSlice({
  name: "TokenReducer",
  initialState,
  reducers: {
    updateTokenFetchState: (
      nextState,
      { payload }: PayloadAction<FETCH_STATE>
    ) => {
      nextState.tokenFetchState = payload;
    },

    updateAccessToken: (
      nextState,
      { payload }: PayloadAction<string | null>
    ) => {
      nextState.accessToken = payload;
    }
  }
});

export const { updateTokenFetchState, updateAccessToken } =
  TokenReducer.actions;
export default TokenReducer.reducer;
