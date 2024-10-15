import { useEffect, useState } from "react";
import AccommodationTable from "../components/accommodations/AccommodationTable";

const fetchAllAccommodationByMember = async (token) => {
	try {
		const response = await fetch("/api/accommodation/all-by-member", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch all accommodations by member.");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching all accommodations by member: ", error);
		return [];
	}
};

export default function AccommodationsManagerPage() {
	const [accommodations, setAccommodations] = useState([]);
	const token = sessionStorage.getItem("accessToken");

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAllAccommodationByMember(token);
			setAccommodations(data);
		};

		if (token) {
			fetchData();
		}
	}, [token]);

	return (
		<AccommodationTable accommodations={accommodations} />
	);
}
