import React from "react";

import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { SideBar } from "../components";


const NotFoundPage = ({ history, classes }) => (
  <Grid container direction="column" alignItems="center">
    <SideBar/>
     {/* <Button onClick={() => history.push("/materials")} variant="outlined">
      Return to home page
    </Button>  */}
  </Grid>
);

const styles = () => ({
  text: {
    fontWeight: "bold"
  }
});

export default withStyles(styles)(withRouter(NotFoundPage));