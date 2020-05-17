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
//-----------------------------------------------------------------------------------------------------------

//------------------------------------------------- Icons ------------------------------------------------
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------  Message Function  ------------------------------------------------
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//-----------------------------------------------------------------------------------------------------------

const QuizHeaderMain = ({ classes, setReloadQuizzes, match, history }) => {
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
    callback
  ) => {
    const url = "/DoctorMakeQuiz/AddQuiz";
    try {
      // post syntax (url, body, options)
      const { data } = await post(url, null, {
        params: {
          name: Name,
          description: Description,
          startDate: date.start,
          endDate: date.end,
          duration: Duration,
          shuffleQuestion: questionType,
          subID: match.params.courseId,
          numberOfQuestions: numberOfQues,
        },
      });
      setReloadQuizzes(true);
      handleClick();
      setMessageTitle(Name);
      history.push(`/createquiz/${match.params.courseId}/${data}`);
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
        }) =>
          ViewData(
            Name,
            Description,
            date,
            Duration,
            numberOfQues,
            questionType,
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
  addButton: {
    borderRadius: "16px",
    width: "180px",
    height: "50px",
    marginLeft: "180px",

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
    color: "white",

    paddingLeft: "5px",
    "&:hover, &:focus": {color: "black"},
  },
  addButtonBody: {
    marginLeft: "4px",
    marginRight: "4px",
  },
  tableHeader: {
  
    paddingRight: "20px",
    paddingLeft: "1000px",
    marginTop: "20px",
    marginLeft: "30px",
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
