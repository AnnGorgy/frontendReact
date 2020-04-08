import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";

// ------------------------------------------------- Images --------------------------------------------------
import Header from "./Images/HomeBackground.jpg";
// -----------------------------------------------------------------------------------------------------------

const Home = ({ history, classes }) => {
  return (
    <Grid classes={classes.container}>

      {/* Navigation bar */}
      <Grid >
        <SideBar />
      </Grid>

      {/* BackGround Image With it's Style */}
      <div style={{
        backgroundImage: `url(${Header})`, backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center left",
        height: "750px"
      }}></div>

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
