import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		flex: 1,
		padding: theme.spacing(2),
		height: `calc(100% - 48px)`,
		maxWidth: "none !important",
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(1),
		},
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(0.5),
			height: `calc(100% - 56px)`,
		},
	},

	contentWrapper: {
		height: "100%",
		overflowY: "hidden",
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(1),
		[theme.breakpoints.down("sm")]: {
			gap: theme.spacing(0.5),
		},
	},
}));

const MainContainer = ({ children }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mainContainer}>
			<div className={classes.contentWrapper}>{children}</div>
		</Container>
	);
};

export default MainContainer;
