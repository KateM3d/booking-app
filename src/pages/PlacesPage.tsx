import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [checkin, setcheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [maxGuests, setMaxGuests] = useState<number>(1);

  const handleInputForm = (title: string, description: string) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {handleInputForm("Title", "Here should be short title")}
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {handleInputForm("Address", "Add address of this place")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {handleInputForm("Photos", "Add photos of your place")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using link...jpg"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
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
              </button>
            </div>
            {handleInputForm("Description", "Add short description")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {handleInputForm("Perks", " Select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />

            {handleInputForm("Extra Info", "Any info you want to add")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {handleInputForm(
              "Check in and Check out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time:</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkin}
                  onChange={(e) => setcheckin(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time:</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>{" "}
              <div>
                <h3 className="mt-2 -mb-1">Max guests:</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) =>
                    setMaxGuests(parseInt(e.target.value, 10) || 0)
                  }
                />
              </div>
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
