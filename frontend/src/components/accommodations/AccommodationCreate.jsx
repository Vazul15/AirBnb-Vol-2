import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "@material-tailwind/react";

export default function AccommodationUpdate() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		roomNumber: 0,
		pricePerNight: 0.0,
		maxGuests: 0,
		location: {
			street: "",
			city: "",
			state: "",
			country: "",
			zipCode: "",
		},
	});
	const token = sessionStorage.getItem("accessToken");

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name in formData) {
			setFormData({ ...formData, [name]: value });
		} else {
			setFormData({
				...formData,
				location: { ...formData.location, [name]: value },
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/accommodation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to create accommodation.");
			}

			console.log(response.status);

			console.log("Accommodation created successfully.");
			navigate("/accommodations-manager");
		} catch (error) {
			console.error("Error creating accommodation: ", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-6 p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg"
		>
			<h2 className="text-3xl font-bold mb-6 text-center">Accommodation Details</h2>

			<div className="w-full flex flex-col gap-4">
				<Input
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Textarea
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					rows={4}
					className="w-full"
				/>

				<Input
					label="Room Number"
					name="roomNumber"
					type="number"
					value={formData.roomNumber}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Input
					label="Price Per Night"
					name="pricePerNight"
					type="number"
					step="0.10"
					value={formData.pricePerNight}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Input
					label="Max Guests"
					name="maxGuests"
					type="number"
					value={formData.maxGuests}
					onChange={handleChange}
					required
					className="w-full"
				/>
			</div>

			<div className="mt-4 w-full flex flex-col gap-4">
				<h3 className="text-xl font-semibold mb-2 text-center">Location Details</h3>
				<Input
					label="Street"
					name="street"
					value={formData.location.street}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Input
					label="City"
					name="city"
					value={formData.location.city}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Input
					label="State"
					name="state"
					value={formData.location.state}
					onChange={handleChange}
					className="w-full"
				/>
				<Input
					label="Country"
					name="country"
					value={formData.location.country}
					onChange={handleChange}
					required
					className="w-full"
				/>
				<Input
					label="Zip Code"
					name="zipCode"
					value={formData.location.zipCode}
					onChange={handleChange}
					className="w-full"
				/>
			</div>

			<div className="flex justify-center mt-6 w-full">
				<Button type="submit" color="green" className="w-full md:w-auto">
					Create Accommodation
				</Button>
			</div>
		</form>
	);
}
