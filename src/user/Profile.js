import React, { useState, useEffect } from "react";
import {
	makeStyles,
	Paper,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	Avatar,
	ListItemText,
	IconButton,
	Typography,
	Divider,
} from "@material-ui/core";

import { Edit, Person } from "@material-ui/icons";

import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { readUserProfile } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: "auto",
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
	}),
	title: {
		marginTop: theme.spacing(3),
		color: theme.palette.protectedTitle,
	},
}));

const Profile = ({ match }) => {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [redirectToSignin, setRedirectToSignin] = useState(false);
	const { token } = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		readUserProfile(
			{
				userId: match.params.userId,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data && data.err) {
				setRedirectToSignin(true);
				console.log(data);
			} else {
				console.log(typeof setUser);
				console.log(data);
				setUser(data);
			}
		});

		return () => {
			abortController.abort();
		};
	}, [match.params.userId, token]);

	const photoUrl = user._id
		? `http://localhost:8000/api/users/photo/${
				user._id
		  }?${new Date().getTime()}`
		: "";

	console.log(photoUrl);

	if (redirectToSignin) {
		return <Redirect to="/signin" />;
	}
	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h6" className={classes.title}>
				Profile
			</Typography>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar src={photoUrl}>
							<Person />
						</Avatar>
					</ListItemAvatar>
					{console.log(user)}
					<ListItemText primary={user.name} secondary={user.email} />
					{auth.isAuthenticated().user &&
						auth.isAuthenticated()._id === user._id && (
							<ListItemSecondaryAction>
								<Link to={"/user/edit/" + user._id}>
									<IconButton
										aria-label="Edit"
										color="primary">
										<Edit />
									</IconButton>
								</Link>
								<DeleteUser userId={user._id} />
							</ListItemSecondaryAction>
						)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={user.about}
						secondary={
							"Joined: " + new Date(user.createdAt).toDateString()
						}
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

export default Profile;
