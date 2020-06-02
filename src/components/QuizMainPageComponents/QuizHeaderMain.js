import React, { useState } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Grid,
  withStyles,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//------------------------------ Another Components Used In This Component -------------------------------
import Quiz from "./Quiz";
import { BreadCrumbs } from "..";
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  ------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const QuizHeaderMain = ({
  classes,
  setReloadQuizzes,
  match,
  history,
  crumbs,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [OpenQuiz, setOpenQuiz] = useState(false);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [open, setOpen] = React.useState(false);
  const [MessageTitle, setMessageTitle] = useState("");
  //-----------------------------------------------------------------------------------------------------------

  // ---------------------- we use it To Show The Message after every operation ----------------------------
  const handleClick = () => {
    setOpen(true);
  };
  //-----------------------------------------------------------------------------------------------------------

  // --------------- we use it To hide The Message that will appear after  every operation -----------------
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //-----------------------------------------------------------------------------------------------------------

  // -------------------------------------------- API Calls ------------------------------------------------
  const ViewData = async (
    Name,
    Description,
    date,
    Duration,
    numberOfQues,
    questionType,
    GradeAppear,
    num,
    callback
  ) => {
    const url = "/DoctorMakeQuiz/AddQuiz";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, num, {
        params: {
          SubjectName: match.params.coursename,
          DrName: localStorage.getItem("DoctorName"),
          name: Name,
          description: Description,
          startDate: date.start,
          endDate: date.end,
          duration: Duration,
          shuffleQuestion: questionType,
          subID: match.params.courseId,
          numberOfQuestions: numberOfQues,
          appearGrade: GradeAppear,
        },
      });
      setReloadQuizzes(true);
      handleClick();
      setMessageTitle(Name);
      history.push(
        `/createquiz/${match.params.courseId}/${data}/${match.params.coursename}`
      );
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };
  //-----------------------------------------------------------------------------------------------------------
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        className={classes.message}
      >
        <Alert onClose={handleClose} severity="success">
          {MessageTitle} has been uploaded
        </Alert>
      </Snackbar>
      <Quiz
        isOpened={OpenQuiz}
        onClose={() => setOpenQuiz(false)}
        onSubmit={({
          Name,
          Description,
          date,
          Duration,
          numberOfQues,
          questionType,
          GradeAppear,
          num,
        }) =>
          ViewData(
            Name,
            Description,
            date,
            Duration,
            numberOfQues,
            questionType,
            GradeAppear,
            num,
            () => setOpenQuiz(false)
          )
        }
      />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.tableHeader}
      >
        <Grid item xs={7}>
          {crumbs?.length ? (
            <BreadCrumbs crumbs={crumbs} />
          ) : (
            <React.Fragment />
          )}
        </Grid>
        {crumbs.length == 1 &&
          history.push(
            `/course/${match.params.courseId}/${match.params.coursename}`
          )}
        {accountType == 2 && (
          <Grid item>
            <Button
              onClick={() => setOpenQuiz(true)}
              className={classes.addButton}
              size="small"
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                className={classes.addButtonBody}
              >
                <Grid item>
                  <AddMaterialIcon className={classes.addIcon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.buttonText}>
                    Add New Quiz
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};
const styles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  breadCrumpContainer: {
    maxWidth: "100%",
  },
  addButton: {
    borderRadius: "16px",
    width: "180px",
    color: "white",
    backgroundColor: "#0c6170",
    "&:hover, &:focus": {
      backgroundColor: "#3C808C",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    "&:hover, &:focus": { color: "black" },
    color: "white",
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    flexWrap: "nowrap",
  },

  noWrap: {
    flexWrap: "nowrap",
  },
  message: {
    Width: "150px",
    height: "150px",
    position: "absolute",
    zIndex: 9999,
  },
});

export default withStyles(styles)(withRouter(QuizHeaderMain));
