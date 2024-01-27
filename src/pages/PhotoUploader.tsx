import axios from "axios";
import { useState } from "react";

interface PhotoUploaderProps {
  addedPhotos: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  addedPhotos,
  onChange,
}) => {
  const [photoLink, setPhotoLink] = useState<string>("");

  const handleAddPhotoByLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filenames } = response;
          onChange((prev) => {
            return [...prev, ...filenames];
          });
        });
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using link...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={(e) => handleAddPhotoByLink(e)}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((el, index) => (
            <div key={index} className="h-32 flex">
              <img
                src={"http://localhost:4000/uploads/" + el}
                alt="image"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}
        <label className="cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
