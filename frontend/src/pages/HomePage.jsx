import React, { useEffect, useState } from "react";
import AccommodationSearchInput from "../components/accommodations/AccommodationSearchInput.jsx";
import AccommodationList from "../components/accommodations/AccommodationList.jsx";

const fetchAccommodations = async () => {
	try {
		const response = await fetch("/api/accommodation/all");
		if (!response.ok) {
			throw new Error("Failed to fetch accommodations.");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching accommodations:", error);
	}
};

const HomePage = () => {
	const [accommodations, setAccommodations] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fetchAndSetAccommodations = async () => {
			const data = await fetchAccommodations();
			setAccommodations(data);
		}
		if (!isSearching) {
			fetchAndSetAccommodations();
		}
	}, [isSearching]);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-center mb-8">
				<AccommodationSearchInput
					className="w-full max-w-md"
					setSearchResults={setSearchResults}
					setIsSearching={setIsSearching}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<AccommodationList accommodations={isSearching ? searchResults : accommodations} />
			</div>
		</div>
	);
};

export default HomePage;
