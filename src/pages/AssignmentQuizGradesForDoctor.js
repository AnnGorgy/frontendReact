import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  SideBar,
  GradesNavigationButtons,
  GradesBreadCrumbsHeader,
} from "../components";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid, Typography } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const AssignmentQuizGradesForDoctor = ({ match, history }) => {
  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      {/* Navigation bar */}
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          spacing={1}
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item style={{marginTop:"50px"}}>
            <GradesBreadCrumbsHeader />
          </Grid>

          <Grid item>
            <Grid
              item
              style={{
                marginTop: "100px",
                marginLeft:"80px"
              }}
            >
              <GradesNavigationButtons />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(AssignmentQuizGradesForDoctor);
