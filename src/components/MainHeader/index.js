import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	contactsHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "0px 6px 6px 6px",
		flexWrap: "wrap",
		gap: theme.spacing(1),
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "stretch",
			gap: theme.spacing(2),
		},
		[theme.breakpoints.down("sm")]: {
			padding: "0px 4px 4px 4px",
			gap: theme.spacing(1),
		},
	},
}));

const MainHeader = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.contactsHeader}>{children}</div>;
};

export default MainHeader;
