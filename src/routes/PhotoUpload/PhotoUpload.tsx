import { FileWithPath, useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import {
  deleteDraftPhotos,
  updateDraftPhotosActions,
  uploadPhotosAction
} from "../../redux/actions/PhotoActions";
import { useCallback, useState } from "react";
import { getCurrentPhotoDraft } from "../../redux/selectors/PhotoSelectors";
import { PhotoType } from "../../redux/Types/PhotoTypes";

/**
 * Functionalities to be implemented:
 * Prevent file duplication on upload - done
 * Ability to delete a certain file - done
 *  or a certain number of files (Ctrl+Click, Ctrl+Shift+click - lightroom approach)
 */

const createPhotoPreview = (files: FileWithPath[]): PhotoType[] =>
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

const PhotoUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const draftPhotos = useSelector(getCurrentPhotoDraft);
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);

  const onDrop = useCallback(
    (files: FileWithPath[]) =>
      dispatch(updateDraftPhotosActions(createPhotoPreview(files))),
    [dispatch]
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

  const files = draftPhotos?.map(({ id, src }) => (
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

  return (
    <div className="drop-wrapper">
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <BackupIcon />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </section>
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
    </div>
  );
};

export default PhotoUpload;
