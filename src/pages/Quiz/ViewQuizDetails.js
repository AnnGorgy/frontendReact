import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { SideBar, ViewQuizForInstructor } from "../../components";
import { Grid } from "@material-ui/core";

const ViewQuizDetails = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
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
            <ViewQuizForInstructor />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(ViewQuizDetails);
