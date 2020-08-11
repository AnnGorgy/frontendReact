import React, { useState } from "react";
import { withRouter } from "react-router-dom";


//------------------------------------------------- Images ---------------------------------------------------
import Quizs from "../ButtonBasesImages/Quizs.jpg";
import Assignments from "../ButtonBasesImages/Assignments.jpg";
import Excel from "../ButtonBasesImages/ExcelSheet.jpg";
import AssignmentDoctor from "../ButtonBasesImages/AssignmentDoctor.png";
import Grades from "../ButtonBasesImages/Grades.png";
import materials from "../ButtonBasesImages/Materials.jpg";
//----------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Typography, ButtonBase, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const CoursesNavigationButtons = ({ history, match, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  //----------------------------------------------------------------------------------------------------


  const images = [
    {
      url: materials,
      title: "Open Materials",
      onClick: () =>
        accountType == 2
          ? history.push(`/courses/${match.params.courseId}/${match.params.coursename}/materials`)
          : history.push(`/courses/${match.params.courseId}/${match.params.coursename}/StudentMaterials`),
    },
    {
      url: Quizs,
      title: accountType !== 2 ? "Online Quiz" : "Create Quiz",
      onClick: () =>
        accountType == 2
          ? history.push(`/quiz/${match.params.courseId}/${match.params.coursename}`)
          : history.push(`/quizstudent/${match.params.courseId}/${match.params.coursename}`),
    },
    {
      url: accountType == 2 ? AssignmentDoctor : Assignments,
      title:
        accountType !== 2
          ? "Upload assignment answers"
          : "Student Assignment Answers",
      onClick: () =>
        accountType == 2
          ? history.push(`/assignmentInstructor/${match.params.courseId}/${match.params.coursename}`)
          : history.push(`/assignmentstudent/${match.params.courseId}/${match.params.coursename}`),
    },
    {
      url: accountType == 2 ? Excel : Grades,
      title: accountType == 2 ? "Student Grades" : "Grades",
      onClick: () =>
        
          history.push(`/grades/${match.params.courseId}/${match.params.coursename}`)
         
    },
  ];

  return (
    <React.Fragment>
      <div className={classes.root}>
        {images.map(({ title, url, onClick }) => (
          <ButtonBase
            focusRipple
            key={title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={onClick}
            style={{
              width: "24%",
              height: "380px",
              marginLeft:"11px"
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 0,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid black",
        color: "black",
        fontWeight: "bold",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    bottom: 20,
    display: "flex",
    color: theme.palette.common.white,
    fontWeight:"bold"
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: "5px",
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
});

export default withStyles(styles)(withRouter(CoursesNavigationButtons));
