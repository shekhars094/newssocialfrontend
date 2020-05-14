import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Home from "./core/Home";

const MainRouter = () => {
	return (
		<div>
			<Menu />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" component={Signup} />
				<Route path="/signin" component={Signin} />
			</Switch>
		</div>
	);
};

export default MainRouter;
