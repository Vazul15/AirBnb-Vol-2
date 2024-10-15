import React, { useEffect, useState } from "react";

const fetchSearchAccommodations = async (query) => {
	try {
		const response = await fetch(`/api/accommodation/search?query=${encodeURIComponent(query)}`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		return [];
	}
};

const AccommodationSearchInput = ({ setSearchResults, setIsSearching }) => {
	const [query, setQuery] = useState("");

	const handleSearch = async () => {
		if (query.trim()) {
			setIsSearching(true);
			const data = await fetchSearchAccommodations(query);
			setSearchResults(data);
		} else {
			setIsSearching(false);
			setSearchResults([]);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (query.trim()) {
				const data = await fetchSearchAccommodations(query);
				setSearchResults(data);
				setIsSearching(true);
			} else {
				setSearchResults([]);
				setIsSearching(false);
			}
		};

		fetchData();
	}, [query, setSearchResults, setIsSearching]);

	return (
		<div>
			<div className="w-full max-w-sm min-w-[200px]">
				<div className="relative flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-500"
					>
						<path
							fillRule="evenodd"
							d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
							clipRule="evenodd"
						/>
					</svg>

					<input
						className="w-full pl-10 h-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
						placeholder="Search country"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>

					<button
						className="h-10 ml-1 text-white text-sm my-auto px-3 flex items-center bg-slate-800 rounded hover:bg-slate-700"
						type="button"
						onClick={handleSearch}
					>
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccommodationSearchInput;
