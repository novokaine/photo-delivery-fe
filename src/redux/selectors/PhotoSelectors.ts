import { RootState } from "..";

export const getImagesListFetchState = (state: RootState) =>
  state.PhotoReducer.photoFetchState;
export const getCurrentImageList = (state: RootState) =>
  state.PhotoReducer.photoList;
export const getCurrentSelectedImages = (state: RootState) =>
  state.PhotoReducer.selectedPhotos;

// Admin management
export const getCurrentPhotoDraft = (state: RootState) =>
  state.PhotoReducer.draftPhotoList;
