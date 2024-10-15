import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const createReservation = async (newReservation, token) => {
  try {
    const response = await fetch("/api/reservation", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReservation),
    });

    if (!response.ok) {
      throw new Error("Failed to create reservation.");
    }

    const reservationId = await response.json();
    alert(`Reservation created with ID: ${reservationId}`);
  } catch (error) {
    console.error("Error creating reservation:", error);
  }
};

const Booking = ({ accommodation }) => {
  const { pricePerNight, maxGuests } = accommodation;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const { userEmail } = useAuth();
  const { accommodationId } = useParams();
  const token = sessionStorage.getItem('accessToken');

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        setTotalPrice(nights * pricePerNight * guestCount);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate, guestCount, pricePerNight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(startDate) >= new Date(endDate)) {
      alert("End date must be later than the start date.");
      return;
    }

    try {
      const newReservation = {
        startDate,
        endDate,
        memberEmail: userEmail,
        accommodationId: accommodationId,
        value: totalPrice
      };

      await createReservation(newReservation, token);
    } catch (error) {
      console.error("Error during booking process:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white">
      <CardBody>
        <Typography variant="h5" className="text-primary mb-4 text-center">
          Booking
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block mb-1">Start Date:</label>
            <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3 top-8 text-gray-500" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded p-2 w-full pl-10"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1">End Date:</label>
            <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3 top-8 text-gray-500" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-2 w-full pl-10"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Number of Guests:</label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="border rounded p-2 w-full"
              required
            >
              {[...Array(maxGuests)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <Typography variant="h6" className="text-accent mb-4">
            Total Price: {totalPrice.toFixed(2)} USD
          </Typography>
          <Button type="submit" className="bg-primary text-white hover:bg-secondary w-full">
            Book Now
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default Booking;
