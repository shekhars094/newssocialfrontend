import React, { useState } from "react";
import {
	Container,
	Form,
	Col,
	FormGroup,
	Input,
	Label,
	Button,
} from "reactstrap";

import { signin } from "./api-auth";
import auth from "./auth-helper";
import { Redirect } from "react-router";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		RedirectValue: false,
	});

	const handleChange = (name) => (event) => {
		event.preventDefault();
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = () => {
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};

		signin(user).then((data) => {
			if (data && data.err) {
				setValues({ ...values, error: data.err, RedirectValue: false });
			} else {
				auth.authenticate(data, () => {
					console.log("soe");
					setValues({ ...values, RedirectValue: true, error: "" });
				});
			}
		});
	};

	if (values.RedirectValue) {
		return <Redirect to="/" />;
	}

	return (
		<Container className="container-fluid">
			<h2 className="text-center">Sign In</h2>
			<Form className="form">
				<Col>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							value={values.email}
							onChange={handleChange("email")}
							placeholder="some@gmail.com"
						/>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input
							type="password"
							name="password"
							id="examplePassword"
							value={values.password}
							onChange={handleChange("password")}
							placeholder="********"
						/>
					</FormGroup>
				</Col>
				<div className="text-center">
					<Button color="primary" onClick={onSubmit}>
						Signin
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Signin;
