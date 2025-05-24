import { FETCH_STATE } from "../../const/Common";

export interface PhotoType {
  id: string;
  path?: string;
  relativePath?: string;
  lastModified: number;
  name: string;
  size: number;
  type: string;
  src: string;
  webkitRelativePath: string;
}

export interface PhotoReducerType {
  photoFetchState: FETCH_STATE;
  photoList: string[];
  selectedPhotos: string[];
  draftPhotoList: PhotoType[];
  dublicates: string[];
}
