import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { Button, Checkbox } from "@mui/material";
import {
  deleteDraftPhotos,
  updateDraftPhotosActions,
  uploadPhotosAction
} from "../../redux/actions/PhotoActions";
import { createPhotoPreview } from "./photoUtils";
import { FileWithPath, useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";

const PhotoHandler = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);

  const onDrop = useCallback(
    (files: FileWithPath[]) =>
      dispatch(updateDraftPhotosActions(createPhotoPreview(files))),
    [dispatch]
  );
  const { draftPhotoList } = useSelector(
    (state: RootState) => state.PhotoReducer
  );

  const {
    // acceptedFiles, fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"]
    },
    onDrop
  });

  const dropArea = (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <BackupIcon />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </section>
  );

  const files = draftPhotoList?.map(({ id, src }) => (
    <li
      id={id}
      key={id}
      onClick={() =>
        setPhotosToDelete((prev) =>
          prev?.includes(id)
            ? prev.filter((item) => item !== id)
            : [...(prev || []), id]
        )
      }
    >
      <Checkbox className="checkbox" checked={photosToDelete.includes(id)} />
      <img src={src} alt="" width="300" />
    </li>
  ));

  const photoPreview = (
    <div className="photos-list">
      <h4>Files</h4>
      {photosToDelete.length > 0 && (
        <Button
          onClick={() => {
            dispatch(deleteDraftPhotos(photosToDelete));
            setPhotosToDelete([]);
          }}
        >
          Delete selected
        </Button>
      )}
      {files.length > 0 && (
        <Button onClick={() => dispatch(uploadPhotosAction())}>Submit</Button>
      )}
      <ul>{files}</ul>
    </div>
  );

  return (
    <>
      {dropArea}
      {photoPreview}
    </>
  );
};

export default PhotoHandler;
