import React from "react";

import { Grid, withStyles } from "@material-ui/core";
import BreadCrumbs from "./BreadCrumbs";

const MaterialTableHeader = ({ crumbs, classes }) => (
  <Grid container justify="space-between" alignItems="stretch">
    <Grid item className={classes.breadCrumpContainer}>
      {crumbs?.length ? <BreadCrumbs crumbs={crumbs} /> : <React.Fragment />}
    </Grid>
    {/* TODO: add create button */}
    <Grid item> create button </Grid>
  </Grid>
);

const styles = () => ({
  breadCrumpContainer: {
    maxWidth: "50%"
  }
});

export default withStyles(styles)(MaterialTableHeader); 
