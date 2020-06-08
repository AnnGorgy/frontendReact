import React from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component ----------------------------------
import { BreadCrumbs } from "..";
//-----------------------------------------------------------------------------------------------------------

const AllGradesInAspecificQuizHeader = ({
  crumbs,
  classes,
  match,
  history,
}) => {
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
        {crumbs.length == 1 &&
          history.push(
            `/course/${match.params.courseId}/${match.params.coursename}`
          )}
        {crumbs.length == 2 &&
          history.push(
            `/grades/${match.params.courseId}/${match.params.coursename}`
          )}
        {crumbs.length == 3 &&
          history.push(
            `/quizgrades/${match.params.courseId}/${match.params.coursename}`
          )}
      </Grid>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  breadCrumpContainer: {
    maxWidth: "100%",
  },
  addButton: {
    borderRadius: "16px",
    width: "240px",
    color: "white",
    backgroundColor: "#0c6170",
    "&:hover, &:focus": {
      backgroundColor: "#3C808C",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    "&:hover, &:focus": { color: "black" },
    color: "white",
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    flexWrap: "nowrap",
  },

  noWrap: {
    flexWrap: "nowrap",
  },
  message: {
    Width: "150px",
    height: "150px",
    position: "absolute",
    zIndex: 9999,
  },
});

export default withStyles(styles)(withRouter(AllGradesInAspecificQuizHeader));
