import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { SideBar, QuizTableMainStudent } from "../../components";
import { Grid } from "@material-ui/core";

const MainPageForQuizStudent = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [reloadQuiz, setReloadQuiz] = useState(true);
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
            <QuizTableMainStudent
              reloadQuiz={reloadQuiz}
              setReloadQuiz={setReloadQuiz}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(MainPageForQuizStudent);
