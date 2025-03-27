import { useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { updateDraftPhotosActions } from "../../redux/actions/PhotoActions";
import { useEffect, useState } from "react";

const createPhotoPreview = (files: File[]): string[] =>
  files.map((file) => URL.createObjectURL(file));

const PhotoUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentFiles, setCurrentFiles] = useState<string[] | null>(null);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".png"]
      },
      onDrop: (files) => {
        dispatch(updateDraftPhotosActions(files));
        setCurrentFiles((prev) => [
          ...(prev || []),
          ...createPhotoPreview(files)
        ]);
      }
    });

  useEffect(() => {
    return () => {
      currentFiles?.forEach(URL.revokeObjectURL);
      dispatch(updateDraftPhotosActions([]));
    };
  }, [currentFiles, dispatch]);

  const files = currentFiles?.map((file) => (
    <li key={file}>
      <img src={file} alt="" width="300" />
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
        <ul>{files}</ul>
      </div>
    </div>
  );
};

export default PhotoUpload;
