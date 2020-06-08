import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//------------------------------------------------- Images ---------------------------------------------------
import AssignmentGrades from "../ButtonBasesImages/AssignmentGrades.jpg";
import QuizGrades from "../ButtonBasesImages/QuizGrades.png";
//----------------------------------------------------------------------------------------------------

//--------------------------------- What was used from material ui core -------------------------------------
import { Typography, ButtonBase, withStyles } from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

const GradesForDoctorNavigationButtons = ({ history, match, classes }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  //----------------------------------------------------------------------------------------------------

  const images = [
    {
      url: AssignmentGrades,
      title: "Assignemnt Grades",
      onClick: () =>
        accountType == 2
          ? history.push(
              `/assignment/${match.params.courseId}/${match.params.coursename}`
            )
          : history.push(
              `/studentgradesassignment/${match.params.courseId}/${match.params.coursename}`
            ),
    },
    {
      url: QuizGrades,
      title: "Quiz Grades",
      onClick: () =>
        accountType == 2
          ? history.push(
              `/quizgrades/${match.params.courseId}/${match.params.coursename}`
            )
          : history.push(
              `/studentgradesquiz/${match.params.courseId}/${match.params.coursename}`
            ),
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
              width: "46%",
              height: "550px",
              marginLeft:"50px"
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
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

export default withStyles(styles)(withRouter(GradesForDoctorNavigationButtons));
