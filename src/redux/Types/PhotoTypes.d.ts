import { FETCH_STATE } from "../../const/Common";

export interface PhotoType {
  id: string;
  src: string;
  path: string | undefined;
  relativePath: string | undefined;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface PhotoReducerType {
  photoFetchState: FETCH_STATE;
  photoList: string[];
  selectedPhotos: string[];
  draftPhotoList: PhotoType[];
}
