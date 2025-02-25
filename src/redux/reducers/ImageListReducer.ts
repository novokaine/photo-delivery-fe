import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../const/Common";

const initialState = {
  imagesFetchState: FETCH_STATE.IDLE,
  imagesList: [],
  selectedImages: [],
};

const ImageListReducer = createSlice({
  name: "ImageReducer",
  initialState,
  reducers: {
    updateImagesFetchState: (nextState, { payload }) => {
      nextState.imagesFetchState = payload;
    },
    updateImagesList: (nextState, { payload }) => {
      nextState.imagesList = payload;
    },
    updateSelectedImages: (nextState, { payload }) => {
      nextState.selectedImages = payload;
    },
  },
});

export const {
  updateImagesFetchState,
  updateImagesList,
  updateSelectedImages,
} = ImageListReducer.actions;

export default ImageListReducer.reducer;
