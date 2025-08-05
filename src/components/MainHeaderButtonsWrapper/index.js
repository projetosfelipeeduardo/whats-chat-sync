import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	MainHeaderButtonsWrapper: {
		flex: "none",
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1),
		flexWrap: "wrap",
		marginLeft: "auto",
		[theme.breakpoints.down("md")]: {
			flex: "1",
			justifyContent: "stretch",
			marginLeft: 0,
			"& > *": {
				flex: "1",
				minWidth: "200px",
			},
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			"& > *": {
				width: "100%",
				margin: theme.spacing(0.5, 0),
			},
		},
	},
}));

const MainHeaderButtonsWrapper = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.MainHeaderButtonsWrapper}>{children}</div>;
};

export default MainHeaderButtonsWrapper;
