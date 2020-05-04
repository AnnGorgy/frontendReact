import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {StudentAssignmentsTable , SideBar , StudentQuizGrades } from "../components";
import { Grid } from "@material-ui/core";

const StudentGrades = ({match,history}) => {

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
          <Grid item >
            <StudentAssignmentsTable/>
          </Grid>
          <Grid item >
            <StudentQuizGrades/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(StudentGrades);
