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
  const handleRemovePhoto = (
    e: React.MouseEvent<HTMLDivElement>,
    link: string
  ) => {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== link)]);
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
            <div key={index} className="h-32 flex relative">
              <img
                src={"http://localhost:4000/uploads/" + el}
                alt="image"
                className="rounded-2xl w-full object-cover"
              />
              <div
                onClick={(e) => handleRemovePhoto(e, el)}
                className="cursor-pointer absolute top-1 right-1 text-white bg-black p-1 bg-opacity-50 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
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
