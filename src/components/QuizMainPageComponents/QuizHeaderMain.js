import React, { useState } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import { Grid, withStyles, Button, Typography } from "@material-ui/core";
import Quiz from "./Quiz";
import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const QuizHeaderMain = ({ classes, setReloadQuizzes, match }) => {
  const [OpenQuiz, setOpenQuiz] = useState(false);
  const [accountType, setaccountType] = useState(
    JSON.parse(localStorage.getItem("Information")).AccountType
  );
  const [open, setOpen] = React.useState(false);
  const [MessageTitle , setMessageTitle] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const ViewData = async (
    Name,
    Description,
    date,
    TimePicker,
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
          startTime: TimePicker.start,
          endTime: TimePicker.end,
          duration: Duration,
          shuffleQuestion: questionType,
          subID: match.params.courseId,
          numberOfQuestions: numberOfQues,
        },
      });
      setReloadQuizzes(true);
      handleClick();
      setMessageTitle(Name);
      if (callback) callback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        style={{
          Width: "150px",
          height: "150px",
          position: "absolute",
          zIndex: 9999,
        }}
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
          TimePicker,
          Duration,
          numberOfQues,
          questionType,
        }) =>
          ViewData(
            Name,
            Description,
            date,
            TimePicker,
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
const styles = () => ({
  addButton: {
    borderRadius: "16px",
    width: "180px",
    color: "black",
    backgroundColor: "#7dbbb9",
    "&:hover, &:focus": {
      backgroundColor: "#CCE6E5",
      color: "black",
    },
  },
  addIcon: {
    marginTop: "4px",
  },
  buttonText: {
    color: "black",
    paddingLeft: "5px",
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
});

export default withStyles(styles)(withRouter(QuizHeaderMain));
