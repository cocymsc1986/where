import { Upload } from "../components";

const UploadPage = () => {
  const onUpload = () => {
    console.log("uploading");
  };

  return (
    <div>
      <header>Upload Images</header>
      <Upload onUpload={onUpload} />
    </div>
  );
};

export { UploadPage };
