import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE, IDLE } from "../../const/Common";
import { TokenReducerType } from "../Types/TokenTypes";

const initialState: TokenReducerType = {
  tokenFetchState: IDLE,
  accessToken: null
};

const TokenReducer = createSlice({
  name: "TockenReducer",
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
