import React, { useState, useEffect } from "react";

import {
	Card,
	CardActions,
	CardContent,
	Button,
	TextField,
	Typography,
	makeStyles,
	Icon,
} from "@material-ui/core";

import auth from "./../auth/auth-helper";
import { readUserProfile, updateUserProfile } from "./api-user.js";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: "auto",
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
	},
	error: {
		verticalAlign: "middle",
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
	filename: {
		marginLeft: "10px",
	},
}));

const EditProfile = ({ match }) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		password: "",
		email: "",
		open: false,
		photo: "",
		about: "",
		error: "",
		userId: "",
		redirectToProfile: false,
	});
	const { token } = auth.isAuthenticated();

	useEffect(() => {
		readUserProfile(
			{
				userId: match.params.userId,
			},
			{ token: token }
		).then((data) => {
			if (data && data.err) {
				setValues({ ...values, error: data.err });
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
				});
			}
		});
	}, [match.params.userId]);

	const clickSubmit = () => {
		console.log({ ...values });
		const userData = new FormData();

		userData.append("name", values.name);
		userData.append("email", values.email);
		userData.append("password", values.password);
		userData.append("about", values.about);
		userData.append("photo", values.photo);

		console.log(userData.getAll("name"));

		updateUserProfile(
			{
				userId: match.params.userId,
			},
			{
				token: token,
			},
			userData
		).then((data) => {
			if (data && data.err) {
				setValues({ ...values, error: data.err });
			} else {
				setValues({
					...values,
					userId: data._id,
					redirectToProfile: true,
				});
			}
		});
	};
	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;

		setValues({ ...values, [name]: value });
	};

	
	if (values.redirectToProfile) {
		return <Redirect to={"/user/" + values.userId} />;
	}
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h6" className={classes.title}>
					Edit Profile
				</Typography>
				<br />
				<input
					accept="image/*"
					type="file"
					onChange={handleChange("photo")}
					style={{ display: "none" }}
					id="icon-button-file"
				/>
				<label htmlFor="icon-button-file">
					<Button
						variant="contained"
						color="default"
						component="span">
						Upload Avatar
					</Button>
				</label>
				<span className={classes.filename}>
					{values.photo ? values.photo.name : ""}
				</span>

				<br />
				<TextField
					id="name"
					label="Name"
					className={classes.textField}
					value={values.name}
					onChange={handleChange("name")}
					margin="normal"
				/>
				<br />
				<TextField
					id="email"
					type="email"
					label="Email"
					className={classes.textField}
					value={values.email}
					onChange={handleChange("email")}
					margin="normal"
				/>
				<br />
				<TextField
					id="multiline-flexible"
					label="About"
					multiline
					rows="2"
					className={classes.textField}
					value={values.about}
					onChange={handleChange("about")}
					margin="normal"
				/>
				<br />
				<TextField
					id="password"
					type="password"
					label="Password"
					className={classes.textField}
					value={values.password}
					onChange={handleChange("password")}
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
	);
};

export default EditProfile;
