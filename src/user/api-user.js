// Api for creating User

const createUser = async (user) => {
	try {
		const response = await fetch("http://localhost:8000/api/users", {
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

// Api for listing Users

const listUsers = async (signal) => {
	try {
		const response = await fetch("http://localhost:8000/api/users", {
			method: "GET",
			signal: signal,
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

// Reading a Single User Profile

const readUserProfile = async (params, credentials) => {
	try {
		const response = await fetch(
			`http://localhost:8000/api/users/${params.userId}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);

		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

// Updateing a signle User Profile

const updateUserProfile = async (params, credentials, user) => {
	try {
		console.log(user);
		const response = await fetch(
			`http://localhost:8000/api/users/${params.userId}`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
				body: user,
			}
		);

		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

// Delete a User Profile

const deleteUserProfile = async (params, credentials) => {
	try {
		const response = await fetch(
			`http://localhost:8000/api/users/${params.userId}`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export {
	createUser,
	deleteUserProfile,
	listUsers,
	readUserProfile,
	updateUserProfile,
};
