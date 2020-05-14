import React from "react";

import { Redirect, Link, withRouter } from "react-router-dom";

import auth from "../auth/auth-helper";

import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "reactstrap";

const Menu = (props) => {
	return (
		<Navbar color="light" light expand="md">
			<NavbarBrand className="ml-4">NewsSocial</NavbarBrand>
			<Nav className="mr-auto">
				{!auth.isAuthenticated && (
					<NavItem>
						<NavLink>
							<Link to="/myprofile">MyProfile</Link>
						</NavLink>
					</NavItem>
				)}

				<NavItem>
					<NavLink>
						<Link to="/">Home</Link>
					</NavLink>
				</NavItem>
			</Nav>
			<Nav className="flot-right">
				{!auth.isAuthenticated() && (
					<NavItem>
						<NavLink>
							<Link to="/signup">Sign UP</Link>
						</NavLink>
					</NavItem>
				)}
				{!auth.isAuthenticated() && (
					<NavItem>
						<NavLink>
							<Link to="/signin">Sign In</Link>
						</NavLink>
					</NavItem>
				)}
				{auth.isAuthenticated() && (
					<NavItem>
						<NavLink>
							<Link
								to="/signout"
								onClick={() =>
									auth.deleteJwt(() => {
										props.history.push("/");
									})
								}>
								Sign Out
							</Link>
						</NavLink>
					</NavItem>
				)}
			</Nav>
		</Navbar>
	);
};

export default withRouter(Menu);
