import React from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import { BreadCrumbs } from "../";
//-----------------------------------------------------------------------------------------------------------

const DoctorAssignmentsStudensHeader = ({ crumbs, classes, match }) => {
  return (
    <React.Fragment>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.tableHeader}
      >
        <Grid item xs={7}>
          {crumbs?.length ? (
            <BreadCrumbs crumbs={crumbs} />
          ) : (
            <React.Fragment />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const styles = () => ({
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    flexWrap: "nowrap",
  },
});

export default withStyles(styles)(withRouter(DoctorAssignmentsStudensHeader));
