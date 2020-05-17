import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import { SideBar, QuizTableMainStudent ,QuizHeaderMain } from "../../components";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const MainPageForQuizStudent = () => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [reloadQuiz, setReloadQuiz] = useState(true);
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
            <QuizHeaderMain  crumbs={crumbs} />
          </Grid>
          <Grid item>
            <QuizTableMainStudent
              reloadQuiz={reloadQuiz}
              setReloadQuiz={setReloadQuiz}
              setCrumbs={setCrumbs}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(MainPageForQuizStudent);
