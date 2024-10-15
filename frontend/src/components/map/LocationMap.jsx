import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
	width: "100%",
	height: "400px",
};

const LocationMap = ({ locationId }) => {
	const [location, setLocation] = useState(null);

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: apiKey,
	});	

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const response = await fetch(`/api/location/${locationId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch location data.");
				}
				const data = await response.json();
				setLocation(data);
			} catch (error) {
				console.error("Error fetching location: ", error);
			}
		};
		fetchLocation();
	}, [locationId]);

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading Maps...</div>;
	if (!location) return <div>Loading Location...</div>;

	const geocodeAddress = async (address) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				address
			)}&key=${apiKey}`
		);
		const data = await response.json();
		if (data.results && data.results.length > 0) {
			const { lat, lng } = data.results[0].geometry.location;
			return { lat, lng };
		}
		throw new Error("Failed to geocode address");
	};

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={15}
			center={{ lat: 0, lng: 0 }}
			onLoad={async (map) => {
				try {
					const { street, city, state, country, zipCode } = location;
					const address = `${street}, ${city}, ${state}, ${country}, ${zipCode}`;
					const { lat, lng } = await geocodeAddress(address);
					map.setCenter({ lat, lng });
					new window.google.maps.Marker({
						position: { lat, lng },
						map,
					});
				} catch (error) {
					console.error("Error setting map center: ", error);
				}
			}}
		/>
	);
};

export default LocationMap;
