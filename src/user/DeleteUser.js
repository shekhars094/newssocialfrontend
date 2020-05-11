import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	IconButton,
	Button,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import auth from "./../auth/auth-helper";
import { deleteUserProfile } from "./api-user.js";
import { Redirect } from "react-router-dom";

const DeleteUser = (props) => {
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const { token } = auth.isAuthenticated();
	const clickButton = () => {
		setOpen(true);
	};
	const deleteAccount = () => {
		deleteUserProfile(
			{
				userId: props.userId,
			},
			{ token: token }
		).then((data) => {
			if (data && data.err) {
				console.log(data.err);
			} else {
				auth.deleteJwt(() => console.log("deleted"));
				setRedirect(true);
			}
		});
	};
	const handleRequestClose = () => {
		setOpen(false);
	};

	if (redirect) {
		return <Redirect to="/" />;
	}
	return (
		<span>
			<IconButton
				aria-label="Delete"
				onClick={clickButton}
				color="secondary">
				<DeleteIcon />
			</IconButton>

			<Dialog open={open} onClose={handleRequestClose}>
				<DialogTitle>{"Delete Account"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Confirm to delete your account.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={deleteAccount}
						color="secondary"
						autoFocus="autoFocus">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
};

DeleteUser.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default DeleteUser;
