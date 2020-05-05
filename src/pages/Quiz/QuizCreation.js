import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {
  SideBar,
  QuizHeaderCreation,
  QuizStepper,
  Quiz,
  MCQ,
  TrueFalse,
} from "../../components";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const QuizCreation = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [reloadQuizzes, setReloadQuizzes] = useState(true);
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
            <QuizHeaderCreation />
          </Grid>
          <Grid item>
            <QuizStepper />
            {/*<MCQ /> */}
            {/* <TrueFalse />*/}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(QuizCreation);
