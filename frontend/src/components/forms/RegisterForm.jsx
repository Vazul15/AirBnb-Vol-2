import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { PasswordInput } from "../PasswordInput";
import { EmailInput } from "../EmailInput";

export function RegisterForm({ onSave, onLogin }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		return onSave(formData);
	};

	return (
		<Card
			color="transparent"
			shadow={false}
			className="mt-16 mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg"
		>
			<Typography variant="h4" color="black" className="text-center">
				Sign Up
			</Typography>
			<Typography color="gray" className="mt-1 font-normal text-center">
				Welcome! Enter your details to register.
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-full">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						size="lg"
						required
						label="First Name"
						placeholder="Your first name..."
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>

					<Input
						size="lg"
						required
						label="Last Name"
						placeholder="Your last name..."
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>

					<Input
						required
						size="lg"
						label="E-mail"
						placeholder="name@mail.com"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>

					<Input
						type="tel"
						pattern="\+36\s[0-9]{2}\s[0-9]{3}\s[0-9]{4}"
						required
						size="lg"
						label="Phone Number"
						placeholder="+36 12 345 6789"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>

					<Input
						type="password"
						required
						size="lg"
						label="Password"
						placeholder="**********"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>
				</div>
				{/* <Checkbox
					label={
						<Typography variant="small" color="gray" className="flex items-center font-normal">
							I agree to the
							<a href="#" className="font-medium transition-colors hover:text-black">
								&nbsp;Terms and Conditions
							</a>
						</Typography>
					}
					containerProps={{ className: "-ml-2.5" }}
				/> */}
				<Button className="mt-6 bg-black text-white hover:bg-gray-900" fullWidth type="submit">
					Sign Up
				</Button>
				<Typography color="gray" className="mt-4 text-center font-normal">
					Already have an account?{" "}
					<a href="#" className="font-medium text-black" onClick={onLogin}>
						Sign In
					</a>
				</Typography>
			</form>
		</Card>
	);
}
