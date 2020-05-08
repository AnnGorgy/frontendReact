import React from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  StudentAssignmentsTable,
  SideBar,
  StudentQuizGrades,
} from "../components";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const StudentGrades = () => {
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
          <Grid item>
            <StudentAssignmentsTable />
          </Grid>
          <Grid item>
            <StudentQuizGrades />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(StudentGrades);
