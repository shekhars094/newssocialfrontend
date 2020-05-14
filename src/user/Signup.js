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
import { createUser } from "./api-user";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		error: "",
		success: false,
	});

	const handleChange = (name) => (event) => {
		event.preventDefault();
		setValues({ ...values, [name]: event.target.value });
	};

	const onsubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			username: values.username || undefined,
			password: values.password || undefined,
		};
		createUser(user).then((data) => {
			if (data && data.err) {
				setValues({ ...values, error: data.err });
			} else {
				setValues({ ...values, success: true, error: "" });
			}
			setValues({
				name: "",
				email: "",
				username: "",
				password: "",
			});
		});
	};

	return (
		<Container className="container-fluid">
			<h2 className="text-center">Sign Up</h2>
			<Form className="form">
				<Col>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="name"
							name="name"
							id="name"
							value={values.name}
							onChange={handleChange("name")}
							placeholder="Shashi Shekhar"
						/>
					</FormGroup>
				</Col>
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
						<Label for="username">Username</Label>
						<Input
							type="text"
							name="username"
							id="username"
							value={values.username}
							onChange={handleChange("username")}
							placeholder="power22"
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
					<Button color="primary" onClick={onsubmit}>
						SignUp
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Signup;
