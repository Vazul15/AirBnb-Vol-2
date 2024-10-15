import React, { useState } from 'react';
import { Card, Typography, Input, Button } from "@material-tailwind/react";

const MemberProfileEditForm = ({ onUpdate, onDelete, memberData }) => {
  const [formData, setFormData] = useState({
    firstName: memberData.firstName ?? "",
    lastName: memberData.lastName ?? "",
    email: memberData.email ?? "",
    phoneNumber: memberData.phoneNumber ?? "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      onDelete();
    }
  };


 
  return (
    <Card color="transparent" shadow={false}>
      <form onSubmit={handleUpdate} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            First Name
          </Typography>
          <Input
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Last Name
          </Typography>
          <Input
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Phone Number
          </Typography>
          <Input
            type="tel"
            pattern="\+36\s[0-9]{2}\s[0-9]{3}\s[0-9]{4}"
            required
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{ className: "before:content-none after:content-none" }}
            placeholder="**********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Update Profile
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white hover:bg-red-600"
            fullWidth
          >
            Delete Profile
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MemberProfileEditForm;
