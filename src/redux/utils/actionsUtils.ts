import { PhotoType } from "../Types/PhotoTypes";

export const convertToFile = async (photo: PhotoType) => {
  const response = await fetch(photo.src); // Get Blob data
  const blob = await response.blob();
  return new File([blob], photo.name, { type: photo.type });
};
