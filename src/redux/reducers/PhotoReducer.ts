import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDLE } from "../../const/Common";
import { PhotoReducerType, PhotoType } from "../Types/PhotTypes";

const initialState: PhotoReducerType = {
  photoFetchState: IDLE,
  photoList: [],
  selectedPhotos: [],
  draftPhotoList: []
};

const PhotoReducer = createSlice({
  name: "PhotoReducer",
  initialState,
  reducers: {
    updatePhotoFetchState: (nextState, { payload }) => {
      nextState.photoFetchState = payload;
    },
    updatePhotoList: (nextState, { payload }) => {
      nextState.photoList = payload;
    },
    updateSelectedPhotos: (nextState, { payload }) => {
      nextState.selectedPhotos = payload;
    },
    updateDraftPhotos: (nextState, { payload }: PayloadAction<PhotoType[]>) => {
      nextState.draftPhotoList = payload;
    }
  }
});

export const {
  updatePhotoFetchState,
  updatePhotoList,
  updateSelectedPhotos,
  updateDraftPhotos
} = PhotoReducer.actions;

export default PhotoReducer.reducer;
