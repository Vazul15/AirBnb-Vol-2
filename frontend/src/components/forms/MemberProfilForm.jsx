import React, { useState } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";

const MemberProfile = ({ memberData }) => {
  const [showReservations, setShowReservations] = useState(false);

  const handleToggleReservations = () => {
    setShowReservations(prevState => !prevState);
  };

  return (
    <Card color="transparent" shadow={false} className="p-6">
      <Typography variant="h4" color="blue-gray">
        Profile Details
      </Typography>

      <div className="mt-8 mb-2">
        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="-mb-1">
            First Name
          </Typography>
          <Typography size="lg">
            {memberData.firstName}
          </Typography>
        </div>

        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="-mb-1">
            Last Name
          </Typography>
          <Typography size="lg">
            {memberData.lastName}
          </Typography>
        </div>

        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="-mb-1">
            Email
          </Typography>
          <Typography size="lg">
            {memberData.email}
          </Typography>
        </div>

        <div className="mb-4">
          <Typography variant="h6" color="blue-gray" className="-mb-1">
            Phone Number
          </Typography>
          <Typography size="lg">
            {memberData.phoneNumber}
          </Typography>
        </div>

        <Button onClick={handleToggleReservations} color="blue-gray" className="mt-4">
          {showReservations ? 'Hide Reservations' : 'Show Reservations'}
        </Button>

        {showReservations && memberData.reservations && memberData.reservations.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberData.reservations.map((reservation, index) => (
              <Card key={index} className="p-4 shadow-lg rounded-lg transition-transform duration-200 hover:scale-105">
                <Typography variant="h6" color="blue-gray" className="font-semibold mb-2">
                  Reservation Details
                </Typography>
                <div className="flex flex-col">
                  <Typography size="lg" color="gray">
                    <div><strong>Accommodation Name:</strong> {reservation.accommodationName}</div>
                    <div><strong>Start Date:</strong> {reservation.startDate}</div>
                    <div><strong>End Date:</strong> {reservation.endDate}</div>
                    <div><strong>Value:</strong> ${reservation.value}</div>
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MemberProfile;
