import { IDLE, LOADING } from "../../const/Common";
import PhotoReducer, {
  initialState,
  updateDraftPhotos,
  updatePhotoFetchState,
  updatePhotoList,
  updateSelectedPhotos
} from "../../redux/reducers/PhotoReducer";

const mockPhotos = [
  {
    id: "randomId",
    path: "/photo/path",
    relativePath: "/relative/photo/path",
    lastModified: 154587,
    name: "photo_name.jpg",
    size: 47547,
    type: "image/jpg",
    src: "image/src",
    webkitRelativePath: "/webkit/relative/path"
  }
];

describe("Photo actions test", () => {
  it("-> Should handle initial state", () => {
    expect(PhotoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("-> Sould update the loading state", () => {
    const action = updatePhotoFetchState(LOADING);
    const result = PhotoReducer(initialState, action);
    expect(result.photoFetchState).toEqual(LOADING);

    const idleAction = updatePhotoFetchState(IDLE);
    const idleResult = PhotoReducer(initialState, idleAction);
    expect(idleResult.photoFetchState).toEqual(IDLE);
  });

  it("-> Should update photo list", () => {
    const action = updatePhotoList(mockPhotos);
    const result = PhotoReducer(initialState, action);
    expect(result.photoList).toEqual(mockPhotos);
  });

  it("-> Should update selcted photos", () => {
    const action = updateSelectedPhotos([mockPhotos[0].id]);
    const result = PhotoReducer(initialState, action);
    expect(result.selectedPhotos).toEqual([mockPhotos[0].id]);
  });

  it("-> Should update draft photos", () => {
    const action = updateDraftPhotos(mockPhotos);
    const result = PhotoReducer(initialState, action);
    expect(result.draftPhotoList).toEqual(mockPhotos);
  });
});
