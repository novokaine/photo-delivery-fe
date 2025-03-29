import { FileWithPath } from "file-selector";
import { PhotoType } from "../../redux/Types/PhotoTypes";

export const createPhotoPreview = (files: FileWithPath[]): PhotoType[] =>
  files.map((file) => {
    const {
      path,
      relativePath,
      lastModified,
      name,
      size,
      type,
      webkitRelativePath
    } = file;

    return {
      id: Math.random().toString(36).slice(2),
      src: URL.createObjectURL(file),
      path,
      relativePath,
      lastModified,
      name,
      size,
      type,
      webkitRelativePath
    };
  });
