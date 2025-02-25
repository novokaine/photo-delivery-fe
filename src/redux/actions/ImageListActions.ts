import { AppThunk } from "..";
import api from "../../api/Api";
import { FETCH_STATE } from "../../const/Common";
import {
  updateImagesFetchState,
  updateImagesList,
  updateSelectedImages,
} from "../reducers/ImageListReducer";
import {
  getCurrentSelectedImages,
  getImagesListFetchState,
} from "../selectors/ImgagesListSelectors";

export const getImageListAction = (): AppThunk => (dispatch, getState) => {
  const currentFetchState = getImagesListFetchState(getState());
  if (currentFetchState === FETCH_STATE.LOADING) return;

  dispatch(updateImagesFetchState(FETCH_STATE.LOADING));
  api
    .get("/images")
    // @ts-ignore
    .then(({ images }) => {
      dispatch(updateImagesList(images));
      dispatch(updateImagesFetchState(FETCH_STATE.IDLE));
    })
    .catch((err) => dispatch(updateImagesFetchState(FETCH_STATE.ERROR)));
};

export const updateSelectedImageAction =
  (image: string): AppThunk =>
  (dispatch, getState) => {
    const currentSelection: string[] = getCurrentSelectedImages(getState());
    const selection = currentSelection.includes(image)
      ? currentSelection.filter((item) => item !== image)
      : [...currentSelection, image];
    dispatch(updateSelectedImages(selection));
  };

export const downloadSelectedAction = (): AppThunk => (dispatch, getState) => {
  api.downloadSelection(getCurrentSelectedImages(getState()));
};
