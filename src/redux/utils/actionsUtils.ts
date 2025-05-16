import { PhotoType } from "../Types/PhotoTypes";

export const convertToFile = async (photo: PhotoType): Promise<File> => {
  const response = await fetch(photo.src);
  const blob = await response.blob();
  return new File([blob], photo.name, { type: photo.type });
};
