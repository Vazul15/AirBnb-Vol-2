import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeaturedImageGallery } from "../FeauturedImageGallery.jsx";
import LocationMap from "../map/LocationMap.jsx";
import Booking from '../booking/Booking.jsx';

const fetchAccommodationImages = async (accommodationId) => {
  try {
    const response = await fetch(
      `/api/accommodation/${accommodationId}/images`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch accommodation images.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accommodation images:", error);
  }
};

const fetchAccommodationDetails = async (accommodationId) => {
  try {
    const response = await fetch(`/api/accommodation/${accommodationId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch accommodation details.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accommodation details:", error);
  }
};

const AccommodationDetails = () => {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [images, setImages] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const loadAccommodationData = async () => {
      try {
        const [accommodationData, imageData] = await Promise.all([
          fetchAccommodationDetails(accommodationId),
          fetchAccommodationImages(accommodationId)
        ]);
        
        setAccommodation(accommodationData);
        setImages(imageData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadAccommodationData();
  }, [accommodationId]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 rounded-lg shadow-lg p-4">
          <FeaturedImageGallery images={images} />
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-4">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg">
            <LocationMap locationId={accommodation.location.id} />
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsBooking(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
      {isBooking && (
        <Booking 
          accommodation={accommodation}
        />
      )}
    </div>
  );
};

export default AccommodationDetails;
