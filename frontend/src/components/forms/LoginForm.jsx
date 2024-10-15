import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";

const LoginForm = ({ onRegister, onLogin }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		return onLogin(formData);
	};

	return (
		<Card
			color="transparent"
			shadow={false}
			className="mt-16 mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg"
		>
			<Typography variant="h4" color="black" className="text-center">
				Sign In
			</Typography>
			<Typography color="gray" className="mt-1 font-normal text-center">
				Welcome back! Enter your credentials to log in.
			</Typography>
			<form onSubmit={onSubmit} className="mt-8 mb-2 w-full">
				<div className="mb-4 flex flex-col gap-6">
					<Input
						size="lg"
						label="Your Email"
						placeholder="name@mail.com"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>

					<Input
						type="password"
						size="lg"
						label="Password"
						placeholder="********"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="border-gray-200 focus:border-gray-900"
					/>
				</div>
				<Button className="mt-6 bg-black text-white hover:bg-gray-900" fullWidth type="submit">
					Log In
				</Button>
				<Typography color="gray" className="mt-4 text-center font-normal">
					Don't have an account?{" "}
					<a href="#" className="font-medium text-black" onClick={onRegister}>
						Sign Up
					</a>
				</Typography>
			</form>
		</Card>
	);
};

export default LoginForm;
