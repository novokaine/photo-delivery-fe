import { LOADING } from "../../const/Common";
import photoReducer, {
  updateDraftPhotos,
  updatePhotoFetchState,
  updatePhotoList
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

const adminApi = {
  uploadPhotos: jest.fn().mockResolvedValue(() => [{ some: "content" }])
};

describe("Photo actions test", () => {
  it("-> Sould update the loading state", () => {
    const loadingStateNew = photoReducer(
      undefined,
      updatePhotoFetchState(LOADING)
    );
    expect(loadingStateNew.photoFetchState).toEqual(LOADING);
  });

  it("-> Should update photo list", () => {
    const newPhotoList = photoReducer(undefined, updatePhotoList(mockPhotos));
    expect(newPhotoList.photoList).toEqual(mockPhotos);
  });

  it("-> Should update draft photos", () => {
    const photoStateNew = photoReducer(
      undefined,
      updateDraftPhotos(mockPhotos)
    );
    expect(photoStateNew.draftPhotoList).toEqual(mockPhotos);
  });
});
