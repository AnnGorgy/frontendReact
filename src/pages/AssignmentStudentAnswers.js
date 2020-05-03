import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {
  SideBar,
  AssignmentStudentAnswersHeader,
  AssignmentStudentAnswersTable,
} from "../components";
import { Grid } from "@material-ui/core";

const AssignmentStudentAnswers = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [reloadAssignment, setReloadAssignment] = useState(true);
  const [crumbs, setCrumbs] = useState([]);
  //--------------------------------------------------------------------------------------------------------
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
            <AssignmentStudentAnswersHeader
              setReloadAssignments={setReloadAssignment}
              crumbs={crumbs}
            />
          </Grid>
          <Grid item>
            <AssignmentStudentAnswersTable
              reloadAssignments={reloadAssignment}
              setReloadAssignments={setReloadAssignment}
              setCrumbs={setCrumbs}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(AssignmentStudentAnswers);
