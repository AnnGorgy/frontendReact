import React from "react";

import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import { Grid } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------
import { SideBar } from "../components";

import HomeStepper from "../components/HomeStepper";

const Home = () => {
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
            <HomeStepper />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(Home);
