import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
	return (
		<div>
			<Menu />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/users" component={Users} />
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
				<PrivateRoute
					path="/user/edit/:userId"
					component={EditProfile}
				/>
				<Route path="/user/:userId" component={Profile} />
			</Switch>
		</div>
	);
};

export default MainRouter;
