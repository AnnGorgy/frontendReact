import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//------------------------------ Another Components Used In This Component ----------------------------------
import {
  SideBar,
  InstructorProfile,
  CoursesNavigationButtons,
} from "../components";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Images ---------------------------------------------------
import Profile from "./Images/Profile.png";
//------------------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  Typography,
  Button,
  Tooltip,
  withStyles,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const CourseHome = ({ history, match , classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const CourseName = JSON.parse(localStorage.getItem("subjects")).find(
    (subject) => subject.ID == match.params.courseId
  ).Subjectname;
  const [openInstructorProfile, setopenInstructorProfile] = useState(false);
  const DoctorName = JSON.parse(localStorage.getItem("DrInformation"))[0]
    ?.doctorName;
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  //--------------------------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <InstructorProfile
        isOpened={openInstructorProfile}
        onClose={() => setopenInstructorProfile(false)}
      />
      <Grid container className={classes.MainPage}>
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
              <Typography className={classes.FirstGrid}>
                {CourseName}
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: "2px" }}>
              <Grid item className={classes.secondGrid}>
                <Tooltip title="Doctor Profile" placement="top">
                  <img
                    className={classes.ProfileImg}
                    alt="ProfileImage"
                    src={Profile}
                    onClick={() => {
                      setopenInstructorProfile(true);
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item className={classes.DoctorInfoPosition}>
                <Tooltip title="Doctor Profile" placement="botton">
                  <label
                    className={classes.docotrNameStyle}
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
              {accountType == 2 && (
                <Grid item className={classes.enrolledStudentsButtonPosition}>
                  <Button
                    variant="outlined"
                    color="default"
                    onClick={() => {
                      history.push(
                        `/courses/${match.params.courseId}/students`
                      );
                    }}
                  >
                    <img
                      src="https://img.icons8.com/wired/50/000000/students.png"
                      alt="Students_LOGO"
                    />
                    <Typography className={classes.enrolledStudentsButton}>
                      Enrolled Students
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item>
              <Grid className={classes.navigationButtonsContainer}>
                <CoursesNavigationButtons />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const styles = () => ({
  navigationButtonsContainer: {
    height: "470px",
    borderRadius: "2px",
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    backgroundColor: "white",
    marginRight: "9px",
    marginTop: "26px",
  },
  ProfileImg: {
    width: "138px",
    height: "138px",
    borderRadius: "256px",
    border: "5px solid black",
    position: "absolute",
    zIndex: "1",
    cursor: "pointer",
  },
  FirstGrid: {
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
    fontFamily: "sans-serif ",
  },
  secondGrid: {
    height: "120px",
    borderRadius: "2px",
    webkitBoxShadow: "5px 5px 5px #9E9E9E",
    mozBoxShadow: "5px 5px 5px #9E9E9E",
    boxShadow: "5px 5px 5px #9E9E9E",
    backgroundColor: "white",
    marginRight: "9px",
    paddingLeft: "55px",
    paddingTop: "25px",
  },
  enrolledStudentsButton: {
    color: "black",
    paddingLeft: "12px",
    fontSize: "20px",
    fontWeight: "600",
  },
  docotrNameStyle: {
    fontSize: "30px",
    cursor: "pointer",
    fontFamily: "sans-serif ",
  },
  MainPage: {
    flexWrap: "nowrap",
  },
  enrolledStudentsButtonPosition: {
    marginTop: "-63px",
    marginLeft: "1100px",
  },
  DoctorInfoPosition: {
    marginLeft: "245px",
    marginTop: "-80px",
  },
});

export default withStyles(styles)(withRouter(CourseHome));
