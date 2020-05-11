import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";

import { Link, withRouter } from "react-router-dom";

import auth from "./../auth/auth-helper";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#004081" };
	} else {
		return { color: "#ffffff" };
	}
};
const Menu = withRouter(({ history }) => (
	<AppBar position="static">
		<Toolbar>
			<Typography variant="h6" color="inherit">
				NewsSocial
			</Typography>
			<Link to="/">
				<IconButton aria-label="Home" style={isActive(history, "/")}>
					<HomeIcon />
				</IconButton>
			</Link>
			<Link to="/users">
				<Button style={isActive(history, "/users")}>Users</Button>
			</Link>
			{!auth.isAuthenticated() && (
				<span>
					<Link to="/signup">
						<Button style={isActive(history, "/signup")}>
							Sign up
						</Button>
					</Link>
					<Link to="/signin">
						<Button style={isActive(history, "/signin")}>
							Sign In
						</Button>
					</Link>
				</span>
			)}
			{auth.isAuthenticated() && (
				<span>
					<Link to={"/user/" + auth.isAuthenticated()._id}>
						<Button
							style={isActive(
								history,
								"/user/" + auth.isAuthenticated()._id
							)}>
							My Profile
						</Button>
					</Link>
					<Button
						color="inherit"
						onClick={() => {
							auth.deleteJwt(() => history.push("/"));
						}}>
						Sign out
					</Button>
				</span>
			)}
		</Toolbar>
	</AppBar>
));

export default Menu;
