import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FETCH_STATE, IDLE } from "../../const/Common";
import { PhotoReducerType, PhotoType } from "../Types/PhotoTypes";

export const initialState: PhotoReducerType = {
  photoFetchState: IDLE,
  photoList: [],
  selectedPhotos: [],
  draftPhotoList: [],
  dublicates: []
};

const PhotoReducer = createSlice({
  name: "PhotoReducer",
  initialState,
  reducers: {
    updatePhotoFetchState: (
      nextState,
      { payload }: PayloadAction<FETCH_STATE>
    ) => {
      nextState.photoFetchState = payload;
    },
    updatePhotoList: (nextState, { payload }) => {
      nextState.photoList = payload;
    },
    updateSelectedPhotos: (nextState, { payload }: PayloadAction<string[]>) => {
      nextState.selectedPhotos = payload;
    },
    updateDublicates: (nextState, { payload }: PayloadAction<string[]>) => {
      nextState.dublicates = payload;
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
  updateDraftPhotos,
  updateDublicates
} = PhotoReducer.actions;

export default PhotoReducer.reducer;
