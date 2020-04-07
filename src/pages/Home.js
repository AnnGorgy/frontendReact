import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";
import Header from "./Images/HomeBackground.jpg";

const Home = ({ history, classes }) => {
  return (
    <Grid classes={classes.container}>
    <Grid >
      <SideBar/>
    </Grid>
    
    <div style={{   backgroundImage: `url(${Header})`, backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center left",
    height:"750px"}}></div>
   
    </Grid>
  );
};

const styles = () => ({
  text: {
    fontWeight: "bold",
  },
  container: {
    flexWrap: "nowrap",
  }
});

export default withStyles(styles)(withRouter(Home));

/* <Button onClick={() => history.push("/materials")} variant="outlined">
      Return to home page
    </Button>  */
