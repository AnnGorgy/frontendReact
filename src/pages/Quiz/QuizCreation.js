import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  SideBar,
  QuizHeaderCreation,
  QuizStepper,
} from "../../components";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuizCreation = () => {
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
            <QuizHeaderCreation />
          </Grid>
          <Grid item>
            <QuizStepper />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(QuizCreation);
