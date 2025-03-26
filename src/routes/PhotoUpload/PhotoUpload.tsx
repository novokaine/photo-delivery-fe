import { useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";

const PhotoUpload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        <>
          <img src={URL.createObjectURL(file)} alt="" width="300" />
        </>
      </li>
    );
  });

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
