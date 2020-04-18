import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { SideBar } from "../components";
import { Grid, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { InstructorProfile } from "../components";

import Profile from "./Images/Profile.png";
import CoursesNavigationButtons from "../components/ButtonBases/CoursesNavigationButtons";
const CourseHome = ({ history, match }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const CourseName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId).Subjectname;
  const [openInstructorProfile, setopenInstructorProfile] = useState(false);
  const DoctorName = JSON.parse(localStorage.getItem("DrInformation"))[0].doctorName;
  //--------------------------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <InstructorProfile
        isOpened={openInstructorProfile}
        onClose={() => setopenInstructorProfile(false)}
      />
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
                {CourseName}
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
                <Tooltip title="Doctor Profile" placement="top">
                  <img
                    alt="ProfileImage"
                    src={Profile}
                    onClick={() => {
                      setopenInstructorProfile(true);
                    }}
                    style={{
                      width: "138px",
                      height: "138px",
                      borderRadius: "256px",
                      border: "5px solid black",
                      position: "absolute",
                      zIndex: "1",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid style={{ marginLeft: "245px", marginTop: "-80px" }}>
                <Tooltip title="Doctor Profile" placement="botton">
                  <label
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => {
                      setopenInstructorProfile(true);
                    }}
                  >
                    {DoctorName} <br />
                  </label>
                </Tooltip>

                <Tooltip title="Doctor Profile" placement="botton">
                  <label
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setopenInstructorProfile(true);
                    }}
                  >
                    Instructor
                  </label>
                </Tooltip>
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
    </React.Fragment>
  );
};
export default withRouter(CourseHome);
