import { signout } from "./api-auth";

// authenticate logic

const authenticate = (jwt, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(jwt));
	}
	next();
};

// isAuthenticated  Logic

const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}

	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

// deleteJwt Logic

const deleteJwt = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
	}
	next();
	signout().then((data) => {
		document.cookie = "Expired";
	});
};

export default { authenticate, deleteJwt, isAuthenticated };
