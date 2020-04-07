import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";
import Header from "./Images/header.jpg";

const Home = ({ history, classes }) => {
  return (
    <Grid classes={classes.container}>
    <Grid >
      <SideBar/>
    </Grid>
   {/*  <Grid>
      <img src= {Header} alt={"Header"} classes={classes.headerr} />
    </Grid> */}
    </Grid>
  );
};

const styles = () => ({
  text: {
    fontWeight: "bold",
  },
  container: {
    flexWrap: "nowrap",
  },
  headerr:{
    marginleft:"100px"
  }
});

export default withStyles(styles)(withRouter(Home));

/* <Button onClick={() => history.push("/materials")} variant="outlined">
      Return to home page
    </Button>  */
