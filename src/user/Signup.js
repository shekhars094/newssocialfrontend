import React, { useState } from "react";
import { createUser } from "./api-user";

import {
	Card,
	makeStyles,
	CardContent,
	Typography,
	TextField,
	Icon,
	CardActions,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: "auto",
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: "middle",
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
}));

const Signup = () => {
	const classes = useStyles();

	const [values, setValues] = useState({
		name: "",
		emai: "",
		user_name: "",
		password: "",
		error: "",
		open: false,
	});

	const hadnleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			user_name: values.user_name || undefined,
			password: values.password || undefined,
		};
		createUser(user).then((data) => {
			if (data.err) {
				setValues({ ...values, error: data.err });
			} else {
				setValues({ ...values, error: "", open: true });
			}
		});
	};

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h6" className={classes.title}>
						Sign Up
					</Typography>
					<TextField
						id="name"
						label="Name"
						className={classes.textField}
						value={values.name}
						onChange={hadnleChange("name")}
						margin="normal"
					/>
					<br />
					<TextField
						id="email"
						label="Email"
						type="email"
						className={classes.textField}
						value={values.email}
						onChange={hadnleChange("email")}
						margin="normal"
					/>
					<br />
					<TextField
						id="user_name"
						type="text"
						label="Username"
						className={classes.textField}
						value={values.user_name}
						onChange={hadnleChange("user_name")}
						margin="normal"
					/>
					<br />
					<TextField
						id="password"
						label="Password"
						type="password"
						className={classes.textField}
						value={values.password}
						onChange={hadnleChange("password")}
						margin="normal"
					/>
					<br />
					{values.error && (
						<Typography component="p" color="error">
							<Icon color="error" className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>

				<CardActions>
					<Button
						color="primary"
						variant="contained"
						onClick={clickSubmit}
						className={classes.submit}>
						Submit
					</Button>
				</CardActions>
			</Card>
			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="/signin">
						<Button
							color="primary"
							autoFocus="autoFocus"
							variant="contained">
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Signup;
