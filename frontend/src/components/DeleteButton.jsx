import { Button } from "@material-tailwind/react";

export default function DeleteButton({ accommodationId }) {
	const handleDeleteClick = async () => {
		try {
			const token = sessionStorage.getItem("accessToken");
			const response = await fetch(`/api/accommodation/${accommodationId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to delete accommodation.");
			}
			console.log("Accommodation deleted successfully.");
		} catch (error) {
			console.error("Error deleting accommodation: ", error);
		}
	};

	return (
		<Button onClick={handleDeleteClick} color="red" size="sm" className="m-2">
			Delete
		</Button>
	);
}
