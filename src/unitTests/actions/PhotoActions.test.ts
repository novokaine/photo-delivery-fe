import { IDLE } from "../../const/Common";
import { setupTestStore } from "../../redux";
import {
  updateDraftPhotosActions,
  updateSelectedImageAction,
  uploadPhotosAction
} from "../../redux/actions/PhotoActions";
import { PhotoType } from "../../redux/Types/PhotoTypes";
import adminApi from "../../api/AdminApi";
import * as actionUtils from "../../redux/utils/actionsUtils";

jest.mock("../../api/AdminApi");
jest.mock("../../redux/utils/actionsUtils");

const existingMockPhoto: PhotoType = {
  id: "testId1",
  lastModified: 5045,
  name: "photo1.jpg",
  size: 7587,
  type: "image/jpeg",
  src: "blob:mock-blob-url-1",
  webkitRelativePath: "imagepath1"
};

const newMockPhoto: PhotoType = {
  id: "testId2",
  lastModified: 5043,
  name: "photo2.jpg",
  size: 7587,
  type: "image/jpeg",
  src: "blob:mock-blob-url-2",
  webkitRelativePath: "imagepath2"
};

const excludedMockedPhoto: PhotoType = {
  id: "testId2",
  lastModified: 5043,
  name: "photo2.jpg",
  size: 7587,
  type: "image/jpeg",
  src: "blob:mock-blob-url-2",
  webkitRelativePath: "imagepath2"
};

describe("Photo actions", () => {
  let store: ReturnType<typeof setupTestStore>;
  beforeEach(() => {
    store = setupTestStore({
      PhotoReducer: {
        photoFetchState: IDLE,
        photoList: [],
        selectedPhotos: [],
        draftPhotoList: [existingMockPhoto]
      }
    });
  });

  it("-> Should handle the update of draft photos", async () => {
    const store = setupTestStore({
      PhotoReducer: {
        photoFetchState: IDLE,
        photoList: [],
        selectedPhotos: [],
        draftPhotoList: [existingMockPhoto]
      }
    });

    store.dispatch(updateDraftPhotosActions([newMockPhoto]));
    const photoState = store.getState().PhotoReducer;

    expect(photoState.draftPhotoList).toHaveLength(2);
    expect(photoState.draftPhotoList).toEqual([
      existingMockPhoto,
      newMockPhoto
    ]);

    // Prevent dublicates
    store.dispatch(updateDraftPhotosActions([excludedMockedPhoto]));
    expect(photoState.draftPhotoList).toHaveLength(2);
    expect(photoState.draftPhotoList).toEqual([
      existingMockPhoto,
      newMockPhoto
    ]);

    // Update draftphotos with an empty array
    store.dispatch(updateDraftPhotosActions([]));
    expect(store.getState().PhotoReducer.draftPhotoList).toEqual([]);
  });

  it("-> Should update the selected images", () => {
    const store = setupTestStore({
      PhotoReducer: {
        photoFetchState: IDLE,
        photoList: [],
        selectedPhotos: [],
        draftPhotoList: [existingMockPhoto, newMockPhoto]
      }
    });

    store.dispatch(updateSelectedImageAction(existingMockPhoto.id));
    expect(store.getState().PhotoReducer.selectedPhotos).toEqual([
      existingMockPhoto.id
    ]);
  });

  it("-> Should handle the photo upload action", async () => {
    const convertToFileSpy = jest.spyOn(actionUtils, "convertToFile");
    (adminApi.uploadPhotos as jest.Mock).mockResolvedValue({});

    await store.dispatch(uploadPhotosAction());

    const { draftPhotoList } = store.getState().PhotoReducer;

    expect(convertToFileSpy).toHaveBeenCalledTimes(draftPhotoList.length);

    draftPhotoList.forEach((photo, index) =>
      expect(convertToFileSpy).toHaveBeenCalledWith(
        photo,
        index,
        draftPhotoList
      )
    );

    convertToFileSpy.mockRestore();
  });
});
