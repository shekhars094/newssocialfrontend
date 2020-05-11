// Signin Logic

const signin = async (user) => {
	try {
		const response = await fetch(`http://localhost:8000/api/auth/signin`, {
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

// Signout Logic

const signout = async () => {
	try {
		const response = await fetch(`/api/auth/signout`, { method: "GET" });
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

export { signin, signout };
