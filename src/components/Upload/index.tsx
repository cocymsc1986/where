import React, { useState } from "react";

type UploadProps = {
  onUpload: (formData: {
    location: string;
    images: Record<string, File>;
  }) => void;
};

const Upload = ({ onUpload }: UploadProps) => {
  const [locationValue, setLocationValue] = useState<string>("");
  const [images, setImages] = useState<Record<string, File>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setImages({
      ...images,
      [e.target.id]: e.target.files[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (locationValue.length && Object.values(images).length === 5) {
      onUpload({
        location: locationValue,
        images,
      });
    }
  };

  const isDisabled = () =>
    !(locationValue.length && Object.values(images).length === 5);

  const renderImageInputs = () =>
    Array.from(Array(5)).map((_, index) => (
      <div key={`input-${index}-field`}>
        <label htmlFor={`image-${index + 1}`}>Image {index + 1}</label>
        <input
          data-testid={`image-${index + 1}-input`}
          id={`image-${index + 1}`}
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
    ));

  return (
    <form onSubmit={handleSubmit} data-testid={"upload-form"}>
      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={locationValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocationValue(e.target.value)
          }
        />
      </div>
      <h3>
        Upload in order of difficulty, image 1 is shown to the user first, image
        5 last
      </h3>
      {renderImageInputs()}
      <button type="submit" disabled={isDisabled()}>
        Upload
      </button>
    </form>
  );
};

export { Upload };
