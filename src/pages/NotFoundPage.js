import React from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const NotFoundPage = ({ history, classes }) => (
  <Grid container direction="column" alignItems="center">
    <Grid item>
      <Typography
        className={classes.text}
        variant="h2"
        align="center"
        color="error"
      >
        Page not found
      </Typography>
    </Grid>
    <Button onClick={() => history.push("/home")} variant="outlined">
      Return to home page
    </Button>
  </Grid>
);

const styles = () => ({
  text: {
    fontWeight: "bold",
  },
});

export default withStyles(styles)(withRouter(NotFoundPage));
