import { useDropzone } from "react-dropzone";

const PhotoUpload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        <>
          <img src={URL.createObjectURL(file)} alt="" width="100" />
          {file.path}
        </>
      </li>
    );
  });

  return (
    <div className="drop-wrapper">
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </section>
      <div className="photos-list">
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    </div>
  );
};

export default PhotoUpload;
