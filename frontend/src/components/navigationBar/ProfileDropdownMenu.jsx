import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Typography,
} from "@material-tailwind/react";
import houseIcon from "../../assets/house.svg";
import profileIcon from "../../assets/profile.svg";
import settingsIcon from "../../assets/settings.svg";
import signOutIcon from "../../assets/sign-out.svg";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export function ProfileDropdownMenu() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleNavigateRegister = () => {
		navigate("/profile");
	};

	const handleNavigateProfileEdit = () => {
		navigate("/profileEdit");
	};

	const handleNavigateAccommodationsManager = () => {
		navigate("/accommodations-manager");
	};

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<Menu>
			<MenuHandler>
				<Avatar
					variant="circular"
					alt="tania andrew"
					className="cursor-pointer"
					src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
				/>
			</MenuHandler>
			<MenuList>
				<MenuItem className="flex items-center gap-2" onClick={handleNavigateRegister}>
					<img src={profileIcon} alt="House Icon" width="14" height="14" />
					<Typography variant="small" className="font-medium">
						My Profile
					</Typography>
				</MenuItem>
				<MenuItem className="flex items-center gap-2" onClick={handleNavigateProfileEdit}>
					<img src={settingsIcon} alt="House Icon" width="14" height="14" />
					<Typography variant="small" className="font-medium">
						Edit Profile
					</Typography>
				</MenuItem>
				<MenuItem className="flex items-center gap-2" onClick={handleNavigateAccommodationsManager}>
					<img src={houseIcon} alt="House Icon" width="14" height="14" />
					<Typography variant="small" className="font-medium">
						Manage Accommodations
					</Typography>
				</MenuItem>
				<MenuItem className="flex items-center gap-2">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14 8C14 8.993 13.759 9.929 13.332 10.754L11.808 9.229C12.0362 8.52269 12.0632 7.76679 11.886 7.046L13.448 5.484C13.802 6.249 14 7.1 14 8ZM8.835 11.913L10.415 13.493C9.654 13.8281 8.83149 14.0007 8 14C7.13118 14.0011 6.27257 13.8127 5.484 13.448L7.046 11.886C7.63267 12.0298 8.24426 12.039 8.835 11.913ZM4.158 9.117C3.96121 8.4394 3.94707 7.72182 4.117 7.037L4.037 7.117L2.507 5.584C2.1718 6.34531 1.99913 7.16817 2 8C2 8.954 2.223 9.856 2.619 10.657L4.159 9.117H4.158ZM5.246 2.667C6.09722 2.22702 7.04179 1.99825 8 2C8.954 2 9.856 2.223 10.657 2.619L9.117 4.159C8.34926 3.93538 7.53214 3.94687 6.771 4.192L5.246 2.668V2.667ZM10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z"
							fill="#90A4AE"
						/>
					</svg>
					<Typography variant="small" className="font-medium">
						Help
					</Typography>
				</MenuItem>
				<hr className="my-2 border-blue-gray-50" />
				<MenuItem className="flex items-center gap-2 " onClick={handleLogout}>
					<img src={signOutIcon} alt="Sign Out Icon" width="14" height="14" />
					<Typography variant="small" className="font-medium">
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
export default ProfileDropdownMenu;
