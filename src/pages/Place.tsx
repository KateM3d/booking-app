import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "./AddressLink.tsx";
import Booking from "./Booking.tsx";
import PlaceGallery from "./PlaceGalery.tsx";

interface PlaceData {
  _id: string;
  title: string;
  price: number;
  address: string;
  description: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  extraInfo: string;
  photos: string[];
}

const Place: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<PlaceData | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get<PlaceData>(`/places/${id}`).then((response) => {
      setPlace(response.data);
      console.log(response.data);
    });
  }, [id]);

  if (!place) return null;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <h2 className="text-2xl">$ {place.price}</h2> <span>/per night</span>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
      </div>
      <div>
        <Booking place={place} />
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default Place;
