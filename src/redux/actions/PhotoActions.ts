import { AppThunk } from "..";
import adminApi from "../../api/AdminApi";
import api from "../../api/Api";
import { ERROR, IDLE, LOADING, SUCCESS } from "../../const/Common";
import {
  updateDraftPhotos,
  updateDublicates,
  updatePhotoFetchState,
  updatePhotoList,
  updateSelectedPhotos
} from "../reducers/PhotoReducer";
import {
  getCurrentPhotoDraft,
  getCurrentSelectedImages,
  getImagesListFetchState
} from "../selectors/PhotoSelectors";
import { PhotoType } from "../Types/PhotoTypes";
import { convertToFile } from "../utils/actionsUtils";

export const getPhotoListAction = (): AppThunk => (dispatch, getState) => {
  const currentFetchState = getImagesListFetchState(getState());
  if (currentFetchState === LOADING) return;

  dispatch(updatePhotoFetchState(LOADING));
  api
    .get("/images")
    // @ts-ignore
    .then(({ images }) => {
      dispatch(updatePhotoList(images));
      dispatch(updatePhotoFetchState(IDLE));
    })
    .catch(() => dispatch(updatePhotoFetchState(ERROR)));
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
  (photos: PhotoType[]): AppThunk =>
  (dispatch, getState) => {
    if (photos.length === 0) return dispatch(updateDraftPhotos([]));

    const currentDraft = getCurrentPhotoDraft(getState());
    const draftNames: string[] = currentDraft.map(({ name }) => name);

    // Filtering - avoid dublicate images
    const filtered = photos.filter(({ name }) => !draftNames.includes(name));

    if (filtered.length === 0) return;

    dispatch(updateDraftPhotos([...currentDraft, ...filtered]));
    dispatch(checkForDublicatesAction());
  };

export const deleteDraftPhotos =
  (toDeleteIds: string[]): AppThunk =>
  (dispatch, getState) => {
    const currentDraft = getCurrentPhotoDraft(getState());

    currentDraft
      .filter(({ id }) => toDeleteIds.includes(id))
      .forEach(({ src }) => URL.revokeObjectURL(src));

    const filtered: PhotoType[] = currentDraft.filter(
      ({ id }) => !toDeleteIds.includes(id)
    );

    dispatch(updateDraftPhotos(filtered));
  };

export const checkForDublicatesAction =
  (): AppThunk => (dispatch, getState) => {
    const draftPhotos = getCurrentPhotoDraft(getState()).map(
      ({ name }) => name
    );

    dispatch(updatePhotoFetchState(LOADING));
    adminApi
      .post("/check-dublicates", draftPhotos)
      .then((response) => {
        dispatch(updateDublicates(response));
        dispatch(updatePhotoFetchState(IDLE));
      })
      .catch(() => {
        dispatch(updatePhotoFetchState(ERROR));
      });
  };

export const uploadPhotosAction =
  (): AppThunk => async (dispatch, getState) => {
    const draftPhotos = getCurrentPhotoDraft(getState());
    const formData = new FormData();
    const files = await Promise.all(draftPhotos.map(convertToFile));

    dispatch(updatePhotoFetchState(LOADING));

    files.forEach((file) => {
      formData.append("photos", file);
    });

    adminApi
      .uploadPhotos(formData)
      .then(() => {
        draftPhotos.forEach(({ src }) => URL.revokeObjectURL(src));
        dispatch(updateDraftPhotos([]));
        dispatch(updatePhotoFetchState(SUCCESS));
      })
      .catch(() => {
        dispatch(updatePhotoFetchState(ERROR));
      });
  };
