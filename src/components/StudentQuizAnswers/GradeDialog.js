import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

//--------------------------------- What was used from material ui core -------------------------------------
import {
  Dialog,
  Typography,
  Grid,
  withStyles,
  Button,
} from "@material-ui/core";
//-----------------------------------------------------------------------------------------------------------

//--------------------------------------------- Images ------------------------------------------------------
import Grades from "../ViewingTheQuiz/Grades.png";
//-----------------------------------------------------------------------------------------------------------

const GradeDialog = ({
  onClose,
  title,
  isOpened,
  classes,
  grade,
  match,
  history,
}) => {
  // ---------------------------- variables with it's states that we use it in this Dialog -------------------
  const [StudentGradeee, setStudentGradeee] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setStudentGradeee(grade);
  }, [grade]);

  return (
    isOpened && (
      <Dialog
        onClose={() => {
          onClose();
        }}
        open={isOpened}
        maxWidth="sm"
        fullWidth
        PaperProps={{ className: classes.dialogPaper }}
      >
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          className={classes.dialog}
        >
          <Grid item className={classes.titleContainer}>
            <Typography
              variant="h3"
              className={classes.boldText}
              align="center"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="space-around">
              <Grid item xs={11}>
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  justify="center"
                  spacing={3}
                >
                  <Grid
                    item
                    style={{
                      padding: "10px 10px 10px 10px",
                      borderRadius: "16px",
                      border: "3px solid black",
                      width: "180px",
                      height: "75px",
                      marginLeft: "190px",
                      marginTop: "20px",
                    }}
                  >
                    <Grid item style={{ marginLeft: "10px" }}>
                      <img
                        src={Grades}
                        alt="GradeImage"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "-50px", marginLeft: "60px" }}
                    >
                      <Typography
                        style={{
                          marginLeft: "30px",
                          fontFamily: "Monaco",
                          fontSize: "25px",
                        }}
                      >
                        {StudentGradeee}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginLeft:"15px" }}>
                    <Typography style={{ fontSize: "30px" }}>
                      “ If you want to check the Correct answers wait untill the
                      quiz is end then you can see the model answers ”
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                          onClick={() => {
                            onClose();
                            history.push(
                              `/quizstudent/${match.params.courseId}/${match.params.coursename}`
                            );
                          }}
                        >
                          <Typography
                            variant="h6"
                            className={classes.boldText}
                            color="error"
                          >
                            Close
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

// Dialog styles
const styles = () => ({
  dialog: {
    padding: "10px 0px",
  },
  titleContainer: {
    marginBottom: "18px",
  },
  textFieldRoot: {
    backgroundColor: "white",
    borderRadius: "7px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `black !important`,
  },
  label: {
    color: "black !important",
    fontWeight: "600",
  },
  dialogPaper: {
    minHeight: "40vh",
    padding: "20px 0px",
  },
  createButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px black solid",
  },
  cancelButton: {
    height: "40px",
    width: "130px",
    borderRadius: "16px",
    border: "2px red solid",
  },
  boldText: {
    fontWeight: "600",
  },
  createText: {
    color: "silver",
  },
});

export default withStyles(styles)(withRouter(GradeDialog));
