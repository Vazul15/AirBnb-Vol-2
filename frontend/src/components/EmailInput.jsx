import React from "react";
import { Input, Button } from "@material-tailwind/react";

export function EmailInput() {
	const [email, setEmail] = React.useState("");
	const onChange = ({ target }) => setEmail(target.value);

	return (
		<div className="relative flex w-full max-w-[24rem]">
			<Input
				type="email"
				label="Email Address"
				value={email}
				onChange={onChange}
				className="pr-20"
				containerProps={{
					className: "min-w-0",
				}}
			/>
		</div>
	);
}
