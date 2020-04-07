import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";
import Header from "./Images/header.jpg";

const Home = ({ history, classes }) => {
  return (
    <Grid container classes={classes.container}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        course
      </Grid>
    </Grid>
  );
};

const styles = () => ({
  container: {
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(Home));