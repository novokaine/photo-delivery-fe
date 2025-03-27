import { AppThunk } from "..";
import api from "../../api/Api";
import { FileWithPath } from "react-dropzone";
import { FETCH_STATE } from "../../const/Common";
import {
  updateDraftPhotos,
  updatePhotoFetchState,
  updatePhotoList,
  updateSelectedPhotos
} from "../reducers/PhotoReducer";
import {
  getCurrentPhotoDraft,
  getCurrentSelectedImages,
  getImagesListFetchState
} from "../selectors/PhotoSelectors";
import { PhotoType } from "../Types/PhotTypes";

export const getPhotoListAction = (): AppThunk => (dispatch, getState) => {
  const currentFetchState = getImagesListFetchState(getState());
  if (currentFetchState === FETCH_STATE.LOADING) return;

  dispatch(updatePhotoFetchState(FETCH_STATE.LOADING));
  api
    .get("/images")
    // @ts-ignore
    .then(({ images }) => {
      dispatch(updatePhotoList(images));
      dispatch(updateSelectedPhotos(FETCH_STATE.IDLE));
    })
    .catch((err) => dispatch(updatePhotoFetchState(FETCH_STATE.ERROR)));
};

export const updateSelectedImageAction =
  (image: string): AppThunk =>
  (dispatch, getState) => {
    const currentSelection: string[] = getCurrentSelectedImages(getState());
    const selection = currentSelection.includes(image)
      ? currentSelection.filter((item) => item !== image)
      : [...currentSelection, image];
    dispatch(updateSelectedPhotos(selection));
  };

export const downloadSelectedAction = (): AppThunk => (dispatch, getState) => {
  api.downloadSelection(getCurrentSelectedImages(getState()));
};

// Admin management
export const updateDraftPhotosActions =
  (photos: readonly FileWithPath[]): AppThunk =>
  (dispatch, getState) => {
    if (photos.length === 0) return dispatch(updateDraftPhotos([]));

    const currentDraft = getCurrentPhotoDraft(getState());
    const copy: PhotoType[] = [];

    photos.map(
      ({
        path,
        relativePath,
        lastModified,
        name,
        size,
        type,
        webkitRelativePath
      }: FileWithPath) =>
        copy.push({
          path,
          relativePath,
          lastModified,
          name,
          size,
          type,
          webkitRelativePath
        })
    );

    dispatch(updateDraftPhotos([...currentDraft, ...copy]));
  };
