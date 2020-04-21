import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";


// ------------------------------------------------- Images --------------------------------------------------
import Header from "./Images/HomeBackground.jpg";
import HomeStepper from "../components/HomeStepper"
// -----------------------------------------------------------------------------------------------------------

const Home = ({ history, classes }) => {
  return (
    <Grid classes={classes.container}>

      {/* Navigation bar */}
      <Grid >
        <SideBar />
      </Grid>

      <HomeStepper/>

    </Grid>
  );
};

// Page Styles
const styles = () => ({
  container: {
    flexWrap: "nowrap",
  }
});

export default withStyles(styles)(withRouter(Home));
