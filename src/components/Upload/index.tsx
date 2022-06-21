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
      <div>
        <label htmlFor="image-1">Image 1</label>
        <input
          data-testid="image-1-input"
          id="image-1"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <label htmlFor="image-2">Image 2</label>
        <input
          id="image-2"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <label htmlFor="image-3">Image 3</label>
        <input
          id="image-3"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <label htmlFor="image-4">Image 4</label>
        <input
          id="image-4"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <label htmlFor="image-5">Image 5</label>
        <input
          id="image-5"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={handleFileUpload}
        />
      </div>
      <button type="submit" disabled={isDisabled()}>
        Upload
      </button>
    </form>
  );
};

export { Upload };
