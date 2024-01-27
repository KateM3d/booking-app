import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [checkin, setcheckin] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [maxGuests, setMaxGuests] = useState<number>(1);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(100);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setcheckin(data.checkin);
      setCheckout(data.checkout);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const handleInputForm = (title: string, description: string) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const handleAddNewPlace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkin,
      checkout,
      maxGuests,
      price,
    };

    if (id) {
      await axios.put(
        "/places",
        { id, ...placeData },
        { withCredentials: true }
      );
      setRedirect(true);
    } else {
      await axios.post("/places", placeData, { withCredentials: true });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleAddNewPlace}>
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
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
              onChange={(e) => setMaxGuests(parseInt(e.target.value, 10) || 0)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night:</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
