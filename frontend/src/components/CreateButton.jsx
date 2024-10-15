import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function CreateButton() {
	const navigate = useNavigate();

	const handleCreateClick = () => {
		navigate("/accommodation/create");
	};

	return (
		<Button color="green" onClick={handleCreateClick} size="sm" className="m-2">
			Create Accommodation
		</Button>
	);
}
