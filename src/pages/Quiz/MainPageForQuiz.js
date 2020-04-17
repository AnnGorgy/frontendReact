import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { SideBar, QuizTable, QuizHeader } from "../../components";
import { Grid } from "@material-ui/core";

const MainPageForQuiz = () => {
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
            <QuizHeader />
          </Grid>
          <Grid item>
            <QuizTable
              reloadQuiz={reloadQuizzes}
              setReloadQuiz={setReloadQuizzes}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(MainPageForQuiz);
