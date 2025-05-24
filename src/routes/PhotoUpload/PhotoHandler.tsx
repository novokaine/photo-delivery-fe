import React, { useCallback, useState, FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { Button, Checkbox } from "@mui/material";
import {
  deleteDraftPhotos,
  updateDraftPhotosActions,
  uploadPhotosAction
} from "../../redux/actions/PhotoActions";
import { createPhotoPreview } from "./photoUtils";
import { FileWithPath, useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";
import {
  getCurrentPhotoDraft,
  getPhotoDublicates
} from "../../redux/selectors/PhotoSelectors";
import { PhotoType } from "../../redux/Types/PhotoTypes";

interface ListProps {
  photoList: PhotoType[];
  className?: string;
  photosToDelete: string[];
  setPhotosToDelete: React.Dispatch<React.SetStateAction<string[]>>;
}

const RenderPhotList: FC<ListProps> = ({
  photoList,
  className,
  photosToDelete,
  setPhotosToDelete
}): ReactElement => {
  const onPhotoClick = ({ id }: { id: string }) =>
    setPhotosToDelete((prev: string[]) =>
      prev?.includes(id)
        ? prev.filter((item) => item !== id)
        : [...(prev || []), id]
    );

  const renderedList = photoList.map(({ id, src }) => (
    <li
      id={id}
      key={id}
      className={className}
      onClick={() => onPhotoClick({ id })}
    >
      <Checkbox className="checkbox" checked={photosToDelete.includes(id)} />
      <img src={src} alt="" width="200" />
    </li>
  ));

  return <>{renderedList}</>;
};

const Dropzonearea: FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const onDrop = useCallback(
    (files: FileWithPath[]) => {
      dispatch(updateDraftPhotosActions(createPhotoPreview(files)));
    },
    [dispatch]
  );
  const { getRootProps, getInputProps } = useDropzone({
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

  return dropArea;
};

const PhotoPreview: FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
  const dublicates = useSelector(getPhotoDublicates);
  const draftPhotoList = useSelector(getCurrentPhotoDraft);

  const newFilesList = draftPhotoList.filter(
    ({ name }) => !dublicates.includes(name)
  );

  const dublicateList = draftPhotoList.filter(({ name }) =>
    dublicates.includes(name)
  );

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
      {newFilesList.length > 0 && (
        <Button onClick={() => dispatch(uploadPhotosAction())}>Submit</Button>
      )}

      <ul>
        <RenderPhotList
          photoList={newFilesList}
          photosToDelete={photosToDelete}
          setPhotosToDelete={setPhotosToDelete}
        />
      </ul>

      {dublicateList.length > 0 && (
        <>
          <h4>Dublicates</h4>
          <ul>
            <RenderPhotList
              photoList={dublicateList}
              photosToDelete={photosToDelete}
              className="dublicate"
              setPhotosToDelete={setPhotosToDelete}
            />
          </ul>
        </>
      )}
    </div>
  );

  return photoPreview;
};

const PhotoHandler: FC = (): ReactElement => (
  <>
    <Dropzonearea />
    <PhotoPreview />
  </>
);

export default PhotoHandler;
