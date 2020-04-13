import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { SideBar } from "../components";
import { Grid, Typography } from "@material-ui/core";

import Profile from "./Images/Profile.png";
import CoursesNavigationButtons from "../components/ButtonBases/CoursesNavigationButtons" 
const CourseHome = ({ history }) => {
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
            <Typography
              style={{
                align: "left",
                height: "40px",
                marginTop: "10px",
                borderRadius: "2px",
                webkitBoxShadow: "5px 5px 5px #9E9E9E",
                mozBoxShadow: "5px 5px 5px #9E9E9E",
                boxShadow: "5px 5px 5px #9E9E9E",
                marginRight: "9px",
                padding: "15px 0px 30px 10px ",
                fontSize: "40px",
                backgroundColor: "white",
                fontFamily: "Monaco",
              }}
            >
              Computer Information System
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              style={{
                height: "120px",
                borderRadius: "2px",
                webkitBoxShadow: "5px 5px 5px #9E9E9E",
                mozBoxShadow: "5px 5px 5px #9E9E9E",
                boxShadow: "5px 5px 5px #9E9E9E",
                backgroundColor: "white",
                marginRight: "9px",
                paddingLeft: "55px",
                paddingTop: "45px",
              }}
            >
              <img
                alt="ProfileImage"
                src={Profile}
                style={{
                  width: "138px",
                  height: "138px",
                  borderRadius: "256px",
                  border: "5px solid black",
                  position: "absolute",
                  zIndex: "1",
                }}
              />
            </Grid>
            <Grid style={{ marginLeft: "245px", marginTop: "-80px" }}>
              <Typography style={{ fontSize: "30px" }}>Islam Hegazy</Typography>

              <Typography>Instructor</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              style={{
                height: "453px",
                borderRadius: "2px",
                webkitBoxShadow: "5px 5px 5px #9E9E9E",
                mozBoxShadow: "5px 5px 5px #9E9E9E",
                boxShadow: "5px 5px 5px #9E9E9E",
                backgroundColor: "white",
                marginRight: "9px",
                marginTop: "10px",
              }}
            >
              <CoursesNavigationButtons />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withRouter(CourseHome);
