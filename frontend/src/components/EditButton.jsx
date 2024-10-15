import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function EditButton({ accommodationId }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/accommodation/update/${accommodationId}`);
  };

  return (
    <Button onClick={handleEditClick} color="blue" size="sm" className="m-2">
      Edit
    </Button>
  );
}
