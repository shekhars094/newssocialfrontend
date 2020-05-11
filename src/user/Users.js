import React, { useState, useEffect } from "react";
import { listUsers } from "./api-user";
import { makeStyles } from "@material-ui/core/styles";
import {
	List,
	Paper,
	Typography,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	IconButton,
	ListItemSecondaryAction,
} from "@material-ui/core";
import { ArrowForward, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: "auto",
		marginTop: theme.spacing(5),
	},
	title: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
			2
		)}px`,
		color: theme.palette.openTitle,
	},
	media: {
		minHeight: 400,
	},
}));

const Users = () => {
	const [users, setUsers] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const getUsers = async () => {
			const data = await listUsers(signal);

			if (data && data.err) {
				console.log(data.error);
			} else {
				setUsers(data);
			}
		};

		getUsers();

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h6" className={classes.title}>
				All Users
			</Typography>
			<List dense>
				{users.map((item, i) => {
					return (
						<Link to={"/user/" + item._id} key={i}>
							<ListItem button>
								<ListItemAvatar>
									<Avatar>
										<Person />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={item.name} />
								<ListItemSecondaryAction>
									<IconButton>
										<ArrowForward />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Link>
					);
				})}
			</List>
		</Paper>
	);
};

export default Users;
