import { RootState } from "..";

export const getImagesListFetchState = (state: RootState) =>
  state.ImageListReducer.imagesFetchState;
export const getCurrentImageList = (state: RootState) =>
  state.ImageListReducer.imagesList;
export const getCurrentSelectedImages = (state: RootState) =>
  state.ImageListReducer.selectedImages;
