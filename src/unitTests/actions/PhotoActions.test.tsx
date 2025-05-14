import adminApi from "../../api/AdminApi";
import { IDLE, LOADING } from "../../const/Common";
import { uploadPhotosAction } from "../../redux/actions/PhotoActions";

import { setupStore } from "../../redux";
import { PhotoType } from "../../redux/Types/PhotoTypes";
import * as actionsUtils from "../../redux/utils/actionsUtils";

jest.mock("../../api/AdminApi");
jest.mock("../../api/Api");
jest.mock("../../redux/utils/actionsUtils");

class MockFile extends Blob {
  name: string;
  lastModified: number;
  constructor(parts: BlobPart[], name: string, options?: FilePropertyBag) {
    super(parts, options);
    this.name = name;
    this.lastModified = options?.lastModified || Date.now();
  }
}

// global.File = MockFile as any;

const mockPhoto1: PhotoType = {
  id: "testId1",
  lastModified: 5045,
  name: "photo1.jpg",
  size: 7587,
  type: "image/jpeg",
  src: "blob:mock-blob-url-1",
  webkitRelativePath: "imagepath1"
};
const mockPhoto2: PhotoType = {
  id: "testId2",
  lastModified: 5046,
  name: "photo2.png",
  size: 8000,
  type: "image/png",
  src: "blob:mock-blob-url-2",
  webkitRelativePath: "imagepath2"
};
const mockDraftPhotos: PhotoType[] = [mockPhoto1, mockPhoto2];
const mockedAdminApi = adminApi as jest.Mocked<typeof adminApi>;
const mockedActionsUtils = actionsUtils as jest.Mocked<typeof actionsUtils>;

describe("Photo actions test", () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore({
      PhotoReducer: {
        draftPhotoList: [...mockDraftPhotos],
        photoFetchState: IDLE,
        selectedPhotos: [],
        photoList: []
      }
    });
    jest.clearAllMocks();

    mockedActionsUtils.convertToFile.mockImplementation(
      async (photo: PhotoType): Promise<any> =>
        mockDraftPhotos[mockDraftPhotos.findIndex(({ id }) => id === photo.id)]
    );
  });

  describe("uploadPhotosAction", () => {
    it("should successfully upload photos and update state", async () => {
      mockedAdminApi.uploadPhotos.mockResolvedValue({});

      await store.dispatch(uploadPhotosAction());
      const photoReducerState = store.getState().PhotoReducer;

      expect(photoReducerState.photoFetchState).toBe(LOADING);

      expect(mockedActionsUtils.convertToFile).toHaveBeenCalledTimes(
        mockDraftPhotos.length
      );

      expect(mockedAdminApi.uploadPhotos).toHaveBeenCalledTimes(1);
    });
  });
});
