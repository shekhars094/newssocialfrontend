// Create user (Signup)

import { API } from "../backend";

const createUser = async (user) => {
	try {
		const response = await fetch(`${API}/users`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export { createUser };
