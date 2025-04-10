import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteReducerType, RoutesReducerTypes } from "../Types/RoutestTypes";

const initialState: RoutesReducerTypes = {
  availableRoutes: []
};

const RoutesReducer = createSlice({
  initialState,
  name: "RoutesReducer",
  reducers: {
    updateRoutes: (
      nextState,
      { payload }: PayloadAction<RouteReducerType[]>
    ) => {
      nextState.availableRoutes = payload;
    }
  }
});

export const { updateRoutes } = RoutesReducer.actions;
export default RoutesReducer.reducer;
